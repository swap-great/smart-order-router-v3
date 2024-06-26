import { computePoolAddress, Pool } from '@uniswap/v3-sdk';
import retry from 'async-retry';
import _ from 'lodash';
import { IUniswapV3PoolState__factory } from '../../types/v3/factories/IUniswapV3PoolState__factory';
import { V3_CORE_FACTORY_ADDRESSES } from '../../util/addresses';
import { log } from '../../util/log';
import { poolToString } from '../../util/routes';
export class V3PoolProvider {
    /**
     * Creates an instance of V3PoolProvider.
     * @param chainId The chain id to use.
     * @param multicall2Provider The multicall provider to use to get the pools.
     * @param retryOptions The retry options for each call to the multicall.
     */
    constructor(chainId, multicall2Provider, retryOptions = {
        retries: 2,
        minTimeout: 50,
        maxTimeout: 500,
    }) {
        this.chainId = chainId;
        this.multicall2Provider = multicall2Provider;
        this.retryOptions = retryOptions;
        // Computing pool addresses is slow as it requires hashing, encoding etc.
        // Addresses never change so can always be cached.
        this.POOL_ADDRESS_CACHE = {};
    }
    async getPools(tokenPairs, providerConfig) {
        const poolAddressSet = new Set();
        const sortedTokenPairs = [];
        const sortedPoolAddresses = [];
        for (const tokenPair of tokenPairs) {
            const [tokenA, tokenB, feeAmount] = tokenPair;
            const { poolAddress, token0, token1 } = this.getPoolAddress(tokenA, tokenB, feeAmount);
            log.info(' poolAddress pool provider v3', poolAddress, ' token0: ', token0.symbol, ' token1: ', token1.symbol);
            if (poolAddressSet.has(poolAddress)) {
                continue;
            }
            poolAddressSet.add(poolAddress);
            sortedTokenPairs.push([token0, token1, feeAmount]);
            sortedPoolAddresses.push(poolAddress);
        }
        log.info(`getPools called with ${tokenPairs.length} token pairs. Deduped down to ${poolAddressSet.size}`);
        const [slot0Results, liquidityResults] = await Promise.all([
            this.getPoolsData(sortedPoolAddresses, 'slot0', providerConfig),
            this.getPoolsData(sortedPoolAddresses, 'liquidity', providerConfig),
        ]);
        log.info(`Got liquidity and slot0s for ${poolAddressSet.size} pools ${(providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber)
            ? `as of block: ${providerConfig === null || providerConfig === void 0 ? void 0 : providerConfig.blockNumber}.`
            : ``}`);
        const poolAddressToPool = {};
        const invalidPools = [];
        for (let i = 0; i < sortedPoolAddresses.length; i++) {
            const slot0Result = slot0Results[i];
            const liquidityResult = liquidityResults[i];
            // These properties tell us if a pool is valid and initialized or not.
            if (!(slot0Result === null || slot0Result === void 0 ? void 0 : slot0Result.success) ||
                !(liquidityResult === null || liquidityResult === void 0 ? void 0 : liquidityResult.success) ||
                slot0Result.result.sqrtPriceX96.eq(0)) {
                const [token0, token1, fee] = sortedTokenPairs[i];
                invalidPools.push([token0, token1, fee]);
                continue;
            }
            const [token0, token1, fee] = sortedTokenPairs[i];
            const slot0 = slot0Result.result;
            const liquidity = liquidityResult.result[0];
            const pool = new Pool(token0, token1, fee, slot0.sqrtPriceX96.toString(), liquidity.toString(), slot0.tick);
            const poolAddress = sortedPoolAddresses[i];
            poolAddressToPool[poolAddress] = pool;
        }
        log.info(' pool-provider invalidPools ', invalidPools);
        if (invalidPools.length > 0) {
            log.info({
                invalidPools: _.map(invalidPools, ([token0, token1, fee]) => `${token0.symbol}/${token1.symbol}/${fee / 10000}%`),
            }, ` ${invalidPools.length} pools invalid after checking their slot0 and liquidity results. Dropping.`);
        }
        const poolStrs = _.map(Object.values(poolAddressToPool), poolToString);
        log.info(' pool-provider poolAddressToPool ', poolAddressToPool);
        log.debug({ poolStrs }, `Found ${poolStrs.length} valid pools`);
        return {
            getPool: (tokenA, tokenB, feeAmount) => {
                log.info(' getPoolAddress in ');
                const { poolAddress } = this.getPoolAddress(tokenA, tokenB, feeAmount);
                log.info(' poolAddressToPool ', poolAddressToPool);
                log.info(' poolAddress ', poolAddress, ' tokenA: ', tokenA.symbol, ' tokenB: ', tokenB.symbol);
                return poolAddressToPool[poolAddress];
            },
            getPoolByAddress: (address) => poolAddressToPool[address],
            getAllPools: () => Object.values(poolAddressToPool),
        };
    }
    getPoolAddress(tokenA, tokenB, feeAmount) {
        const [token0, token1] = tokenA.sortsBefore(tokenB)
            ? [tokenA, tokenB]
            : [tokenB, tokenA];
        const cacheKey = `${this.chainId}/${token0.address}/${token1.address}/${feeAmount}`;
        const cachedAddress = this.POOL_ADDRESS_CACHE[cacheKey];
        if (cachedAddress) {
            return { poolAddress: cachedAddress, token0, token1 };
        }
        const poolAddress = computePoolAddress({
            factoryAddress: V3_CORE_FACTORY_ADDRESSES[this.chainId],
            tokenA: token0,
            tokenB: token1,
            fee: feeAmount,
        });
        // console.log(
        //   feeAmount,
        //   tokenA,
        //   tokenB,
        //   V3_CORE_FACTORY_ADDRESSES[this.chainId],
        //   'params v3'
        // );
        // console.log(poolAddress, 'poolAddress');
        log.info(' V3_CORE_FACTORY_ADDRESSES ', poolAddress);
        this.POOL_ADDRESS_CACHE[cacheKey] = poolAddress;
        return { poolAddress, token0, token1 };
    }
    async getPoolsData(poolAddresses, functionName, providerConfig) {
        const { results, blockNumber } = await retry(async () => {
            return this.multicall2Provider.callSameFunctionOnMultipleContracts({
                addresses: poolAddresses,
                contractInterface: IUniswapV3PoolState__factory.createInterface(),
                functionName: functionName,
                providerConfig,
            });
        }, this.retryOptions);
        log.debug(`Pool data fetched as of block ${blockNumber}`);
        return results;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbC1wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm92aWRlcnMvdjMvcG9vbC1wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUUsa0JBQWtCLEVBQWEsSUFBSSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDdEUsT0FBTyxLQUFrQyxNQUFNLGFBQWEsQ0FBQztBQUM3RCxPQUFPLENBQUMsTUFBTSxRQUFRLENBQUM7QUFFdkIsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDckcsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQThEakQsTUFBTSxPQUFPLGNBQWM7SUFLekI7Ozs7O09BS0c7SUFDSCxZQUNZLE9BQWdCLEVBQ2hCLGtCQUFzQyxFQUN0QyxlQUFtQztRQUMzQyxPQUFPLEVBQUUsQ0FBQztRQUNWLFVBQVUsRUFBRSxFQUFFO1FBQ2QsVUFBVSxFQUFFLEdBQUc7S0FDaEI7UUFOUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQ2hCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsaUJBQVksR0FBWixZQUFZLENBSXJCO1FBakJILHlFQUF5RTtRQUN6RSxrREFBa0Q7UUFDMUMsdUJBQWtCLEdBQThCLEVBQUUsQ0FBQztJQWdCeEQsQ0FBQztJQUVHLEtBQUssQ0FBQyxRQUFRLENBQ25CLFVBQXVDLEVBQ3ZDLGNBQStCO1FBRS9CLE1BQU0sY0FBYyxHQUFnQixJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ3RELE1BQU0sZ0JBQWdCLEdBQXFDLEVBQUUsQ0FBQztRQUM5RCxNQUFNLG1CQUFtQixHQUFhLEVBQUUsQ0FBQztRQUV6QyxLQUFLLE1BQU0sU0FB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