import { Token } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';
import retry from 'async-retry';
import _ from 'lodash';
import { IUniswapV2Pair__factory } from '../../types/v2/factories/IUniswapV2Pair__factory';
import { CurrencyAmount, ID_TO_NETWORK_NAME, metric, MetricLoggerUnit, } from '../../util';
import { log } from '../../util/log';
import { poolToString } from '../../util/routes';
import { TokenValidationResult } from '../token-validator-provider';
export class V2PoolProvider {
    /**
     * Creates an instance of V2PoolProvider.
     * @param chainId The chain id to use.
     * @param multicall2Provider The multicall provider to use to get the pools.
     * @param tokenPropertiesProvider The token properties provider to use to get token properties.
     * @param retryOptions The retry options for each call to the multicall.
     */
    constructor(chainId, multicall2Provider, tokenPropertiesProvider, retryOptions = {
        retries: 2,
        minTimeout: 50,
        maxTimeout: 500,
    }) {
        this.chainId = chainId;
        this.multicall2Provider = multicall2Provider;
        this.tokenPropertiesProvider = tokenPropertiesProvider;
        this.retryOptions = retryOptions;
        // Computing pool addresses is slow as it requires hashing, encoding etc.
        // Addresses never change so can always be cached.
        this.POOL_ADDRESS_CACHE = {};
    }
    async getPools(tokenPairs, providerConfig) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        const poolAddressSet = new Set();
        const sortedTokenPairs = [];
        const sortedPoolAddresses = [];
        for (const tokenPair of tokenPairs) {
            const [tokenA, tokenB] = tokenPair;
            const { poolAddress, token0, token1 } = this.getPoolAddress(tokenA, tokenB);
            log.info(' poolAddress pool provider v2', poolAddress);
            if (poolAddressSet.has(poolAddress)) {
                continue;
            }
            poolAddressSet.add(poolAddress);
            sortedTokenPairs.push([token0, token1]);
            sortedPoolAddresses.push(poolAddress);
        }
        log.debug(`getPools called with ${tokenPairs.length} token pairs. Deduped down to ${poolAddressSet.size}`);
        metric.putMetric('V2_RPC_POOL_RPC_CALL', 1, MetricLoggerUnit.None);
        metric.putMetric('V2GetReservesBatchSize', sortedPoolAddresses.length, MetricLoggerUnit.Count);
        metric.putMetric(`V2GetReservesBatchSize_${ID_TO_NETWORK_NAME(this.chainId)}`, sortedPoolAddresses.length, MetricLoggerUnit.Count);
        const [reservesResults, tokenPropertiesMap] = await Promise.all([
            this.getPoolsData(sortedPoolAddresses, 'getReserves', providerConfig),
            this.tokenPropertiesProvider.getTokensProperties(this.flatten(tokenPairs), providerConfig),
        ]);
        log.info(`Got reserves for ${poolAddressSet.size} pools ${(providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber)
            ? `as of block: ${await (providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber)}.`
            : ``}`);
        const poolAddressToPool = {};
        const invalidPools = [];
        for (let i = 0; i < sortedPoolAddresses.length; i++) {
            const reservesResult = reservesResults[i];
            if (!(reservesResult === null || reservesResult === void 0 ? void 0 : reservesResult.success)) {
                const [token0, token1] = sortedTokenPairs[i];
                invalidPools.push([token0, token1]);
                continue;
            }
            let [token0, token1] = sortedTokenPairs[i];
            if (((_a = tokenPropertiesMap[token0.address.toLowerCase()]) === null || _a === void 0 ? void 0 : _a.tokenValidationResult) === TokenValidationResult.FOT) {
                token0 = new Token(token0.chainId, token0.address, token0.decimals, token0.symbol, token0.name, true, // at this point we know it's valid token address
                (_c = (_b = tokenPropertiesMap[token0.address.toLowerCase()]) === null || _b === void 0 ? void 0 : _b.tokenFeeResult) === null || _c === void 0 ? void 0 : _c.buyFeeBps, (_e = (_d = tokenPropertiesMap[token0.address.toLowerCase()]) === null || _d === void 0 ? void 0 : _d.tokenFeeResult) === null || _e === void 0 ? void 0 : _e.sellFeeBps);
            }
            if (((_f = tokenPropertiesMap[token1.address.toLowerCase()]) === null || _f === void 0 ? void 0 : _f.tokenValidationResult) === TokenValidationResult.FOT) {
                token1 = new Token(token1.chainId, token1.address, token1.decimals, token1.symbol, token1.name, true, // at this point we know it's valid token address
                (_h = (_g = tokenPropertiesMap[token1.address.toLowerCase()]) === null || _g === void 0 ? void 0 : _g.tokenFeeResult) === null || _h === void 0 ? void 0 : _h.buyFeeBps, (_k = (_j = tokenPropertiesMap[token1.address.toLowerCase()]) === null || _j === void 0 ? void 0 : _j.tokenFeeResult) === null || _k === void 0 ? void 0 : _k.sellFeeBps);
            }
            const { reserve0, reserve1 } = reservesResult.result;
            const pool = new Pair(CurrencyAmount.fromRawAmount(token0, reserve0.toString()), CurrencyAmount.fromRawAmount(token1, reserve1.toString()));
            const poolAddress = sortedPoolAddresses[i];
            poolAddressToPool[poolAddress] = pool;
        }
        if (invalidPools.length > 0) {
            log.info({
                invalidPools: _.map(invalidPools, ([token0, token1]) => `${token0.symbol}/${token1.symbol}`),
            }, `${invalidPools.length} pools invalid after checking their slot0 and liquidity results. Dropping.`);
        }
        const poolStrs = _.map(Object.values(poolAddressToPool), poolToString);
        log.debug({ poolStrs }, `Found ${poolStrs.length} valid pools`);
        return {
            getPool: (tokenA, tokenB) => {
                const { poolAddress } = this.getPoolAddress(tokenA, tokenB);
                return poolAddressToPool[poolAddress];
            },
            getPoolByAddress: (address) => poolAddressToPool[address],
            getAllPools: () => Object.values(poolAddressToPool),
        };
    }
    getPoolAddress(tokenA, tokenB) {
        const [token0, token1] = tokenA.sortsBefore(tokenB)
            ? [tokenA, tokenB]
            : [tokenB, tokenA];
        const cacheKey = `${this.chainId}/${token0.address}/${token1.address}`;
        const cachedAddress = this.POOL_ADDRESS_CACHE[cacheKey];
        if (cachedAddress) {
            return { poolAddress: cachedAddress, token0, token1 };
        }
        const poolAddress = Pair.getAddress(token0, token1);
        log.info(poolAddress, 'pool address v2');
        this.POOL_ADDRESS_CACHE[cacheKey] = poolAddress;
        return { poolAddress, token0, token1 };
    }
    async getPoolsData(poolAddresses, functionName, providerConfig) {
        const { results, blockNumber } = await retry(async () => {
            return this.multicall2Provider.callSameFunctionOnMultipleContracts({
                addresses: poolAddresses,
                contractInterface: IUniswapV2Pair__factory.createInterface(),
                functionName: functionName,
                providerConfig,
            });
        }, this.retryOptions);
        log.debug(`Pool data fetched as of block ${blockNumber}`);
        return results;
    }
    // We are using ES2017. ES2019 has native flatMap support
    flatten(tokenPairs) {
        const tokens = new Array();
        for (const [tokenA, tokenB] of tokenPairs) {
            tokens.push(tokenA);
            tokens.push(tokenB);
        }
        return tokens;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm92aWRlcnMvdjIvcG9vbC1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQVcsS0FBSyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZDLE9BQU8sS0FBa0MsTUFBTSxhQUFhLENBQUM7QUFDN0QsT0FBTyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRXZCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzNGLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixnQkFBZ0IsR0FDakIsTUFBTSxZQUFZLENBQUM7QUFDcEIsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUlqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQWdEcEUsTUFBTSxPQUFPLGNBQWM7SUFLekI7Ozs7OztPQU1HO0lBQ0gsWUFDWSxPQUFnQixFQUNoQixrQkFBc0MsRUFDdEMsdUJBQWlELEVBQ2pELGVBQW1DO1FBQzNDLE9BQU8sRUFBRSxDQUFDO1FBQ1YsVUFBVSxFQUFFLEVBQUU7UUFDZCxVQUFVLEVBQUUsR0FBRztLQUNoQjtRQVBTLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0Qyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQTBCO1FBQ2pELGlCQUFZLEdBQVosWUFBWSxDQUlyQjtRQW5CSCx5RUFBeUU7UUFDekUsa0RBQWtEO1FBQzFDLHVCQUFrQixHQUE4QixFQUFFLENBQUM7SUFrQnhELENBQUM7SUFFRyxLQUFLLENBQUMsUUFB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