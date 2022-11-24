import { ethers } from 'ethers';
import { JsonRpcProvider, Web3Provider, AlchemyProvider } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { isDevelopmentEnv } from 'utils/env';

class Provider {
  network: string;  
  readProvider: any;
  writeProvider: any;
  
  constructor() { 
    if (isDevelopmentEnv()) {
      this.network = "hardhat";
      this.readProvider = new JsonRpcProvider("http://127.0.0.1:8545");
    }
    else {
      this.network = "goerli";
      this.readProvider = new AlchemyProvider(this.network, "Bcipbi3wYgtmrR-gkp6Fdc888i3N3ixG");
    }
    
    this.initWriteProvider();
  }
  
  initWriteProvider() {
    if (!this.hasWallet() || this.writeProvider)  return;
    
    this.writeProvider = new Web3Provider(window.ethereum);
  }
  
  async connect() {
    this.initWriteProvider();
    return await this.getAccounts();
  }
  
  hasWallet() {
    return (typeof window.ethereum !== 'undefined');
  }
  
  getReadProvider() {
    return this.readProvider;
  }  
  
  getWriteProvider() {
    return this.writeProvider;
  }
  
  getSigner() {    
    return this.writeProvider.getSigner();    
  }
    
  async getAccounts() {
    return await this.writeProvider.send("eth_requestAccounts", []);
  }
  
  async getChainId() {
    return await this.writeProvider.send("eth_chainId", []);
  }
  
  async switchChainId(chainId: string) {
    return await this.writeProvider.send("wallet_switchEthereumChain", [{ chainId }]);
  }
  
  async sendTransaction(to: string, amount: string) {
    const value: BigNumber = ethers.utils.parseEther(amount);
    return await this.getSigner().sendTransaction({to, value});    
  }
    
}

const provider = new Provider();
export default provider;
