import { ethers } from 'ethers';
import Provider from 'contracts/provider';

export default class Contract {    
  contract: any
    
  constructor(address: string, abi: any) {    
    this.contract = new ethers.Contract(address, abi, Provider.getProvider());
  }
  
  getContract() {    
    return this.contract;
  }
  
}
