import { ethers } from 'ethers';
import { Web3Provider, AlchemyProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber'

class Provider {
  provider: any;
  
  constructor() {        
    if (this.hasWallet()) {
      this.provider = new Web3Provider(window.ethereum);
    }
    else {
      this.provider = new AlchemyProvider("goerli");
    }
  }
  
  hasWallet() {
    return (typeof window.ethereum !== 'undefined');
  }
  
  isConnected() {
    return this.hasWallet();
  }
  
  getProvider() {
    return this.provider;
  }
  
  getSigner() {    
    if (this.hasWallet()) {
      return this.provider.getSigner();  
    }
    else {
      return this.provider;
    }    
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
