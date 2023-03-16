import { ethers } from 'ethers';
import {
  ERC1155ContractAdd,
  ERC20TokenContractAdd,
  StakingContractAdd,
} from 'src/config/contracts';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  erc20ABI,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';
import BATL1155DAOTokenABI from '@web3/ABI/BATL1155DAOToken.json';
import StakingABI from '@web3/ABI/StakingToken.json';

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


export const getStakingFactory = ({ provider, signer }) => {
  return getContractFactory({
    address: StakingContractAdd,
    ABI: StakingABI,
    signer: signer || provider,
  });
};

export const getNFT1155Factory = ({ provider, signer }) => {
  return getContractFactory({
    address: ERC1155ContractAdd,
    ABI: BATL1155DAOTokenABI,
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
  //TODO: check alchemy provider urls
  // it gives post error many times like an loop
  // alchemyProvider({
  //   apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID,
  //   priority: 1,
  // }),
  infuraProvider({
    apiKey: process.env.NEXT_PUBLIC_INFURA_GOERLI_API_KEY,
    priority: 0,
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


export const getUserCustomTokenBalance = async ({ provider, address }) => {
  const tokenContract = getTokenFactory({ provider });
  return tokenContract.balanceOf(address);
};