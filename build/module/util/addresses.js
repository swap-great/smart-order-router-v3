import { ChainId, CHAIN_TO_ADDRESSES_MAP, SWAP_ROUTER_02_ADDRESSES as SWAP_ROUTER_02_ADDRESSES_HELPER, Token, } from '@uniswap/sdk-core';
import { FACTORY_ADDRESS } from '@uniswap/v3-sdk';
import { NETWORKS_WITH_SAME_UNISWAP_ADDRESSES } from './chains';
export const BNB_TICK_LENS_ADDRESS = CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].tickLensAddress;
export const BNB_NONFUNGIBLE_POSITION_MANAGER_ADDRESS = CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].nonfungiblePositionManagerAddress;
export const BNB_SWAP_ROUTER_02_ADDRESS = CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].swapRouter02Address;
export const BNB_V3_MIGRATOR_ADDRESS = CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].v3MigratorAddress;
export const V3_CORE_FACTORY_ADDRESSES = {
    ...constructSameAddressMap(FACTORY_ADDRESS),
    [ChainId.CELO]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO].v3CoreFactoryAddress,
    [ChainId.CELO_ALFAJORES]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO_ALFAJORES].v3CoreFactoryAddress,
    [ChainId.OPTIMISM_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_GOERLI].v3CoreFactoryAddress,
    [ChainId.OPTIMISM_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_SEPOLIA].v3CoreFactoryAddress,
    [ChainId.SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEPOLIA].v3CoreFactoryAddress,
    [ChainId.ARBITRUM_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_GOERLI].v3CoreFactoryAddress,
    [ChainId.ARBITRUM_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_SEPOLIA].v3CoreFactoryAddress,
    [ChainId.BNB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].v3CoreFactoryAddress,
    [ChainId.AVALANCHE]: CHAIN_TO_ADDRESSES_MAP[ChainId.AVALANCHE].v3CoreFactoryAddress,
    [ChainId.BASE_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_GOERLI].v3CoreFactoryAddress,
    [ChainId.BASE]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE].v3CoreFactoryAddress,
    [ChainId.BLAST]: CHAIN_TO_ADDRESSES_MAP[ChainId.BLAST].v3CoreFactoryAddress,
    // TODO: Gnosis + Moonbeam contracts to be deployed
    [ChainId.BASE_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_SEPOLIA].v3MigratorAddress,
};
export const QUOTER_V2_ADDRESSES = {
    ...constructSameAddressMap('0x61fFE014bA17989E743c5F6cB21bF9697530B21e'),
    [ChainId.CELO]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO].quoterAddress,
    [ChainId.CELO_ALFAJORES]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO_ALFAJORES].quoterAddress,
    [ChainId.OPTIMISM_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_GOERLI].quoterAddress,
    [ChainId.OPTIMISM_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_SEPOLIA].quoterAddress,
    [ChainId.SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEPOLIA].quoterAddress,
    [ChainId.ARBITRUM_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_GOERLI].quoterAddress,
    [ChainId.ARBITRUM_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_SEPOLIA].quoterAddress,
    [ChainId.BNB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].quoterAddress,
    [ChainId.AVALANCHE]: CHAIN_TO_ADDRESSES_MAP[ChainId.AVALANCHE].quoterAddress,
    [ChainId.BASE_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_GOERLI].quoterAddress,
    [ChainId.BASE]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE].quoterAddress,
    [ChainId.BLAST]: CHAIN_TO_ADDRESSES_MAP[ChainId.BLAST].quoterAddress,
    // TODO: Gnosis + Moonbeam contracts to be deployed
    [ChainId.BASE_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_SEPOLIA].quoterAddress,
};
export const NEW_QUOTER_V2_ADDRESSES = {
    ...constructSameAddressMap('0x5e55C9e631FAE526cd4B0526C4818D6e0a9eF0e3'),
    [ChainId.CELO]: '0x5e55C9e631FAE526cd4B0526C4818D6e0a9eF0e3',
    [ChainId.CELO_ALFAJORES]: '0x5e55C9e631FAE526cd4B0526C4818D6e0a9eF0e3',
    [ChainId.OPTIMISM_SEPOLIA]: '0x5e55C9e631FAE526cd4B0526C4818D6e0a9eF0e3',
    [ChainId.SEPOLIA]: '0xf0c802dcb0cf1c4f7b953756b49d940eed190221',
    [ChainId.ARBITRUM_SEPOLIA]: '0x5e55C9e631FAE526cd4B0526C4818D6e0a9eF0e3',
    [ChainId.BNB]: '0x5e55C9e631FAE526cd4B0526C4818D6e0a9eF0e3',
    [ChainId.AVALANCHE]: '0xf0c802dcb0cf1c4f7b953756b49d940eed190221',
    [ChainId.POLYGON_MUMBAI]: '0x60e06b92bC94a665036C26feC5FF2A92E2d04c5f',
    [ChainId.BASE]: '0x222cA98F00eD15B1faE10B61c277703a194cf5d2',
    [ChainId.BLAST]: '0x9D0F15f2cf58655fDDcD1EE6129C547fDaeD01b1',
};
export const MIXED_ROUTE_QUOTER_V1_ADDRESSES = {
    [ChainId.MAINNET]: CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].v1MixedRouteQuoterAddress,
    [ChainId.GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.GOERLI].v1MixedRouteQuoterAddress,
};
export const UNISWAP_MULTICALL_ADDRESSES = {
    ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
    [ChainId.CELO]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO].multicallAddress,
    [ChainId.CELO_ALFAJORES]: CHAIN_TO_ADDRESSES_MAP[ChainId.CELO_ALFAJORES].multicallAddress,
    [ChainId.OPTIMISM_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_GOERLI].multicallAddress,
    [ChainId.OPTIMISM_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.OPTIMISM_SEPOLIA].multicallAddress,
    [ChainId.SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.SEPOLIA].multicallAddress,
    [ChainId.ARBITRUM_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_GOERLI].multicallAddress,
    [ChainId.ARBITRUM_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_SEPOLIA].multicallAddress,
    [ChainId.BNB]: CHAIN_TO_ADDRESSES_MAP[ChainId.BNB].multicallAddress,
    [ChainId.AVALANCHE]: CHAIN_TO_ADDRESSES_MAP[ChainId.AVALANCHE].multicallAddress,
    [ChainId.BASE_GOERLI]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_GOERLI].multicallAddress,
    [ChainId.BASE]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE].multicallAddress,
    [ChainId.BLAST]: CHAIN_TO_ADDRESSES_MAP[ChainId.BLAST].multicallAddress,
    // TODO: Gnosis + Moonbeam contracts to be deployed
};
export const SWAP_ROUTER_02_ADDRESSES = (chainId) => {
    var _a;
    return ((_a = SWAP_ROUTER_02_ADDRESSES_HELPER(chainId)) !== null && _a !== void 0 ? _a : '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45');
};
export const OVM_GASPRICE_ADDRESS = '0x420000000000000000000000000000000000000F';
export const ARB_GASINFO_ADDRESS = '0x000000000000000000000000000000000000006C';
export const TICK_LENS_ADDRESS = CHAIN_TO_ADDRESSES_MAP[ChainId.ARBITRUM_ONE].tickLensAddress;
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].nonfungiblePositionManagerAddress;
export const V3_MIGRATOR_ADDRESS = CHAIN_TO_ADDRESSES_MAP[ChainId.MAINNET].v3MigratorAddress;
export const MULTICALL2_ADDRESS = '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696';
export function constructSameAddressMap(address, additionalNetworks = []) {
    return NETWORKS_WITH_SAME_UNISWAP_ADDRESSES.concat(additionalNetworks).reduce((memo, chainId) => {
        memo[chainId] = address;
        return memo;
    }, {});
}
export const WETH9 = {
    [ChainId.MAINNET]: new Token(ChainId.MAINNET, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.GOERLI]: new Token(ChainId.GOERLI, '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.SEPOLIA]: new Token(ChainId.SEPOLIA, '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.OPTIMISM]: new Token(ChainId.OPTIMISM, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.OPTIMISM_GOERLI]: new Token(ChainId.OPTIMISM_GOERLI, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.OPTIMISM_SEPOLIA]: new Token(ChainId.OPTIMISM_SEPOLIA, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.ARBITRUM_ONE]: new Token(ChainId.ARBITRUM_ONE, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.ARBITRUM_GOERLI]: new Token(ChainId.ARBITRUM_GOERLI, '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.ARBITRUM_SEPOLIA]: new Token(ChainId.ARBITRUM_SEPOLIA, '0xc556bAe1e86B2aE9c22eA5E036b07E55E7596074', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.BASE_GOERLI]: new Token(ChainId.BASE_GOERLI, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.BASE]: new Token(ChainId.BASE, '0x4200000000000000000000000000000000000006', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.BLAST]: new Token(ChainId.BLAST, '0x4300000000000000000000000000000000000004', 18, 'WETH', 'Wrapped Ether'),
    [ChainId.BASE_SEPOLIA]: new Token(ChainId.BASE_SEPOLIA, '0x6267947C818ff3900F620FC97d590702afB69147', 18, 'WETH', 'Wrapped Ether'),
};
export const BEACON_CHAIN_DEPOSIT_ADDRESS = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkcmVzc2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWwvYWRkcmVzc2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxPQUFPLEVBQ1Asc0JBQXNCLEVBQ3RCLHdCQUF3QixJQUFJLCtCQUErQixFQUMzRCxLQUFLLEdBQ04sTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFbEQsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUNoQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsZUFBZSxDQUFDO0FBQ3RELE1BQU0sQ0FBQyxNQUFNLHdDQUF3QyxHQUNuRCxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsaUNBQWlDLENBQUM7QUFDeEUsTUFBTSxDQUFDLE1BQU0sMEJBQTBCLEdBQ3JDLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxtQkFBb0IsQ0FBQztBQUMzRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FDbEMsc0JBQXNCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGlCQUFpQixDQUFDO0FBRXhELE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFlO0lBQ25ELEdBQUcsdUJBQXVCLENBQUMsZUFBZSxDQUFDO0lBQzNDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxvQkFBb0I7SUFDekUsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQ3RCLHNCQUFzQixDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxvQkFBb0I7SUFDckUsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQ3ZCLHNCQUFzQixDQUFD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