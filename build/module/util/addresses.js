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
    [ChainId.BASE_SEPOLIA]: '0xAD12073e10F5aA942dd38B1E5FC0C1A4f24770b7',
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
    [ChainId.BASE_SEPOLIA]: CHAIN_TO_ADDRESSES_MAP[ChainId.BASE_SEPOLIA].multicallAddress,
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