import Contract from 'contracts/contract';
import abi from 'contracts/ERC20/abi.json';

export default class ERC20 extends Contract {    
  
  constructor(address: string) {
    super(address, abi);
  }
  
}
