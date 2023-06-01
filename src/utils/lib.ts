import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';

export const parseUnits = ethers.utils.parseUnits;
export const formatUnits = ethers.utils.formatUnits;
export const formatEther = ethers.utils.formatEther;

export function isEmpty(obj: any) {
  if (!obj)  return true;
  if (Array.isArray(obj) || typeof obj === 'string')  return obj.length === 0;

  for (const prop in obj) {
    if (obj.hasOwnProperty && obj.hasOwnProperty(prop))  return false;
    else if (obj[prop])  return false;
  }
  return true;
}

export function notEmpty(obj: any) {
  return !isEmpty(obj);
}

export function clone(obj: object) {
  return Object.assign({}, obj);
}

export function cloneArray(arr: any[]) { 
  return arr.map((e) => { return e; }); 
}

export function merge(obj1: object, obj2: object) {
  return Object.assign(obj1, obj2);
}

export function toQueryString(params: any) {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
}

export function decimal(p: any, d: number = 2) {
  if (typeof p == 'string')  p = parseFloat(p);  
  return parseFloat(p.toFixed(d));
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

export function numberFormat(number: number, minimumFractionDigits = 2, maximumFractionDigits = 6) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits, maximumFractionDigits }).format(number);
}

export function formatMoney(number: number, minimumFractionDigits = 2, maximumFractionDigits = 6) {
  return '$' + numberFormat(number, minimumFractionDigits, maximumFractionDigits);
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

export function first(arr: any[]) {
  if (isEmpty(arr))  return null;
  return arr[0];
}
  
export function last(arr: any[]) {
  if (isEmpty(arr))  return null;
  return arr[arr.length-1];
}

export function count(obj: object) {
  return Object.keys(obj).length;
}

export function timeDiff(start_date: string, end_date: string) {
  const ms = new Date(end_date).getTime() - new Date(start_date).getTime();  
  const seconds = Math.round(ms / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);
  const months = decimal(days / 30);
  const years = decimal(months / 12);  
  return {seconds, minutes, hours, days, months, years};
}

export function sortArrayBy(array: any[], order: any, asc = 1) {
  let sorted_array = cloneArray(array);
  let sortByOrder = (a: any, b: any) => {
    const a_order = a[order] != undefined ? a[order] : 999;
    const b_order = b[order] != undefined ? b[order] : 999;
    return a_order < b_order ? -asc : (a_order > b_order ? asc : 0);
  };
  return sorted_array.sort(sortByOrder);
}

export function firstCap(str: string) {
  if (!str)  return '';  
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function everyCap(str: string) {
  if (!str)  return '';
  str = str.replaceAll('-',' ');
  str = str.replaceAll('_',' ');
  return str.split(' ').map(word => { return firstCap(word); }).join(' ');
}

export function formatSymbol(symbol: string) {
  if (!symbol)  return '';
  if (symbol.startsWith('i_'))  symbol = symbol.replace('i_', '');
  return symbol.toUpperCase();
}
