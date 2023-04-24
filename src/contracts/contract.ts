import { ethers } from 'ethers';
import Provider from 'contracts/provider';

export default class Contract {    
  address: string;
  abi: any;  
  readContract: any;
  writeContract: any;
    
  constructor(_address: string, _abi: any) {
    this.address = _address;
    this.abi = _abi;    
    // this.readContract = new ethers.Contract(this.address, this.abi, Provider.getReadProvider());
  }
  
  getReadContract() {
    return this.readContract;
  }
  
  getWriteContract() {    
    // if (!this.writeContract)  this.writeContract = new ethers.Contract(this.address, this.abi, Provider.getWriteProvider());
    return this.writeContract;
  }
  
}
