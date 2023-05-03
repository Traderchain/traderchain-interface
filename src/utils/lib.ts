import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

export const parseUnits = ethers.utils.parseUnits;
export const formatUnits = ethers.utils.formatUnits;
export const formatEther = ethers.utils.formatEther;

export function clone(obj: object) {
  return Object.assign({}, obj);
}

export function merge(obj1: object, obj2: object) {
  return Object.assign(obj1, obj2);
}

export function toQueryString(params: any) {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export function amountBN(amount: any, decimals = 18) {   
  if (typeof amount == 'number')  amount = amount.toString();  
  return parseUnits(amount, decimals);  
}

export function usdcAmountBN(amount: any) {
  return amountBN(amount, 6);
}

export function amountStr(amount: BigNumber, decimals = 6) {    
  return formatUnits(amount, decimals);
}

export function amountFloat(amount: BigNumber, decimals = 6) {   
  return parseFloat(formatUnits(amount, decimals));
}

export function amountCurrency(amount: BigNumber, decimals = 6, fixed = 2, currency = 'USDC') {
  const number = numberFormat(parseFloat(amountFloat(amount, decimals).toFixed(fixed)));
  return `${number} ${currency}`;
}

export function formatUsdc(amount: BigNumber) {
  return amountCurrency(amount);
}

export function formatWeth(amount: BigNumber) {
  return amountCurrency(amount, 18, 6, 'WETH');
}

export function numberFormat(number: number) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 }).format(number);
}

export function parseAmount(value: any) {
  if (!value || isNaN(value))  return '';
  
  const validChars = value.match(/[\d|.]/g);
  if (!validChars)  return '';

  value = validChars.join('');
  const amount = parseFloat(value);
  if (!isNaN(amount))  return value;
  
  return false;
}

export function parseShares(value: any) {
  if (!value)  return 0;

  let onlyDigits = value.match(/\d/g);
  if (!onlyDigits)  return 0;
  
  value = parseInt(onlyDigits.join(''));
  if (!isNaN(value))  return value;

  return false;
}
