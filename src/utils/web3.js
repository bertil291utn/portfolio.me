import { ethers } from 'ethers';
import { BertilTokenContractAdd } from 'src/config/contratcs';
import BertilTokenABI from '@web3/ABI/BertilToken.json';

export const getContractFactory = ({ address, ABI, provider }) => {
  return new ethers.Contract(address, ABI, provider);
};

export const getTokenFactory = ({ provider }) => {
  return getContractFactory({
    address: BertilTokenContractAdd,
    ABI: BertilTokenABI,
    provider,
  });
};
