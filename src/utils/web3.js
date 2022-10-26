import { ethers } from 'ethers';
import { ERC20TokenContractAdd } from 'src/config/contratcs';
import UpgradeableERC20ABI from '@web3/ABI/UpgradeableERC20.json';

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
