import { ethers } from 'ethers';
import {
  ClaimableContractAdd,
  ERC20TokenContractAdd,
  RateContractAdd,
  StakingContractAdd,
} from 'src/config/contracts';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, erc20ABI } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import ClaimableABI from '@web3/ABI/Claimable.json';
import StakingABI from '@web3/ABI/StakingToken.json';
import RateABI from '@web3/ABI/Rate.json';

export const getContractFactory = ({ address, ABI, signer }) => {
  return new ethers.Contract(address, ABI, signer);
};

export const getTokenFactory = ({ provider, signer }) => {
  return getContractFactory({
    address: ERC20TokenContractAdd,
    ABI: erc20ABI,
    signer: signer || provider,
  });
};

export const getClaimableFactory = ({ provider, signer }) => {
  return getContractFactory({
    address: ClaimableContractAdd,
    ABI: ClaimableABI,
    signer: signer || provider,
  });
};

export const getStakingFactory = ({ provider, signer }) => {
  return getContractFactory({
    address: StakingContractAdd,
    ABI: StakingABI,
    signer: signer || provider,
  });
};

export const getRatingFactory = ({ provider, signer }) => {
  return getContractFactory({
    address: RateContractAdd,
    ABI: RateABI,
    signer: signer || provider,
  });
};

const configProvDev = [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    stallTimeout: 1_000,
    priority: 1,
  }),
  publicProvider({ priority: 0, stallTimeout: 2_000 }),
];
const configProvProd = [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    priority: 0,
  }),
  infuraProvider({
    apiKey: process.env.NEXT_PUBLIC_INFURA_GOERLI_API_KEY,
    priority: 1,
  }),
];
const { chains, provider } = configureChains(
  [chain.goerli],
  process.env.NEXT_PUBLIC_ENV?.toLocaleLowerCase() == 'dev'
    ? configProvDev
    : configProvProd
);

export const chainProv = chains;

const { connectors } = getDefaultWallets({
  appName: 'Bertil portfolio',
  chains,
});

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
});
