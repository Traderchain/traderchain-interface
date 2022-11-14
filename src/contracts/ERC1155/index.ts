import Contract from 'contracts/contract';
import abi from './abi.json';

export default class ERC1155 extends Contract {    
  
  constructor(address: string) {
    super(address, abi);
  }
  
}
