import { ethers } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import { useDispatch, useSelector } from "react-redux";
import AuthStore from 'stores/auth';
import AlertDialogStore from 'stores/alertDialog';

export const formatUnits = ethers.utils.formatUnits;
export const formatEther = ethers.utils.formatEther;

export function usdcAmountBN(amount: any) {
  return BigNumber.from(Math.floor(parseFloat(amount) * 1000000));
}

export function amountBN(amount: any, decimals = 18) {    
  return BigNumber.from(amount).mul(BigNumber.from(10).pow(decimals));
}

export function amountStr(amount: BigNumber, decimals = 6) {    
  return formatUnits(amount, decimals);
}

export function amountFloat(amount: BigNumber, decimals = 6) {   
  return parseFloat(formatUnits(amount, decimals));
}

export function amountCurrency(amount: BigNumber, decimals = 6, fixed = 2) {
  const number = numberFormat(parseFloat(amountFloat(amount, decimals).toFixed(fixed)));
  return `${number} USDC`;
}

export function numberFormat(number: number) {
  return new Intl.NumberFormat('en-US').format(number);
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

export function useAlertDialog() {
  const dispatch = useDispatch();
  
  function showDialog({ title, content }: any) {    
    dispatch(AlertDialogStore.actions.setOpen({ open: true, title, content }));
  }
  
  function showError(err: any) {
    const title = "Error";
    const content = (typeof err == 'object') ? err.message : `${err}`;
    dispatch(AlertDialogStore.actions.setOpen({ open: true, title, content }));
  }

  function hideDialog() {    
    dispatch(AlertDialogStore.actions.setOpen({ open: false }));
  }
  
  return { showDialog, showError, hideDialog };
}

export function useAuth() {
  const { isAuthenticated } = useSelector((state: any) => state.auth );
  const dispatch = useDispatch();
  
  function setAuthenticated(authenticated: boolean) {    
    dispatch(AuthStore.actions.setAuthenticated(authenticated));
  }

  return { isAuthenticated, setAuthenticated };
}
