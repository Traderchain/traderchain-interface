import * as Utils from 'utils';
import  { useFetch } from 'utils/fetch';

export function useSystemT() {
  // const { isAuthenticated, setAuthenticated } = Utils.useAuth();
  const { showDialog, showError, hideDialog } = Utils.useCommonDialog();
  const { getData, postData, putData, deleteData } = useFetch();
  
  async function fetchWatchlist() {
    const params = { published: 1, trading: 1 };
    const url = `/api/system_t/watchlist?` + Utils.toQueryString(params);
    const result = await getData(url);
    return result.data;    
  }

  async function fetchPrices(symbol: string) {
    const params = { symbol };
    const url = `/api/system_t/price?` + Utils.toQueryString(params);
    const result = await getData(url);
    return result.data;
  }

  async function fetchParam(pid: string) {
    const params = { pid };
    const url = `/api/system_t/param?` + Utils.toQueryString(params);
    const result = await getData(url);
    return result.data;
  }

  async function fetchTrades(pid: string) {
    const params = { pid };
    const url = `/api/system_t/trade?` + Utils.toQueryString(params);
    const result = await getData(url);
    return result.data;
  }

  return { fetchWatchlist, fetchPrices, fetchParam, fetchTrades };
}
