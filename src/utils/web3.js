import { ethers } from 'ethers';
import { ERC20TokenContractAdd } from 'src/config/contratcs';
import UpgradeableERC20ABI from '@web3/ABI/UpgradeableERC20.json';
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

export const getContractFactory = ({ address, ABI, provider }) => {
  return new ethers.Contract(address, ABI, provider);
};

export const getTokenFactory = ({ provider }) => {
  return getContractFactory({
    address: ERC20TokenContractAdd,
    ABI: UpgradeableERC20ABI,
    provider,
  });
};

const { chains, provider } = configureChains(
  [chain.goerli],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
    publicProvider(),
  ]
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
