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
      this.provider = new AlchemyProvider("goerli", "Bcipbi3wYgtmrR-gkp6Fdc888i3N3ixG");
    }
  }
  
  async connect() {
    if (!this.hasWallet())  throw Error('Please install a Web3 Wallet');
    
    this.provider = new Web3Provider(window.ethereum);
    return await this.getAccounts();
  }
  
  hasWallet() {
    return (typeof window.ethereum !== 'undefined');
  }
    
  getProvider() {
    return this.provider;
  }
  
  getSigner() {    
    return this.provider.getSigner();    
  }
  
  async getAccounts() {
    if (!this.hasWallet())  throw Error('Please install a Web3 Wallet');
    
    return await this.provider.send("eth_requestAccounts", []);
  }
  
  async sendTransaction(to: string, amount: string) {
    const value: BigNumber = ethers.utils.parseEther(amount);
    return await this.getSigner().sendTransaction({to, value});    
  }
}

const provider = new Provider();
export default provider;
