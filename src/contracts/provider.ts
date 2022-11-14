import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber'

class Provider {
  provider: any
  
  constructor() {    
    // TODO: handle undefined
    this.provider = new Web3Provider(window.ethereum);
  }
  
  getProvider() {
    return this.provider;
  }
  
  getSigner() {
    return this.provider.getSigner();
  }
  
  async getAccounts() {
    try {
      return await this.provider.send("eth_requestAccounts", []);  
    }
    catch(err) {
      console.error(err);
      return [];
    }
  }
  
  async sendTransaction(to: string, amount: string) {
    const value: BigNumber = ethers.utils.parseEther(amount);
    return await this.getSigner().sendTransaction({to, value});    
  }
}

const provider = new Provider();
export default provider;
