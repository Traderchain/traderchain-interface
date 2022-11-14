import Contract from 'contracts/contract';
import abi from './abi.json';

export default class Traderchain extends Contract {    
  
  constructor(address: string) {
    super(address, abi);
  }
  
}
