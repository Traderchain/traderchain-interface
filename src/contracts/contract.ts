import { ethers } from 'ethers';
import Provider from 'contracts/provider';

export default class Contract {  
  signer: any
  contract: any
    
  constructor(address: string, abi: any) {
    this.signer = Provider.getSigner();
    this.contract = new ethers.Contract(address, abi, this.signer);
  }
  
  getContract() {    
    return this.contract;
  }
}
