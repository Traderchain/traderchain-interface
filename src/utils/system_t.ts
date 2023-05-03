import * as Utils from 'utils';
import  { useFetch } from 'utils/fetch';

export function useSystemT() {
  // const { isAuthenticated, setAuthenticated } = Utils.useAuth();
  const { showDialog, showError, hideDialog } = Utils.useCommonDialog();
  const { getData, postData, putData, deleteData } = useFetch();
  
  async function fetchWatchlist() {
    const params = { trading: 1 };
    const url = `/api/system_t/watchlist?` + Utils.toQueryString(params);
    const result = await getData(url);
    return result.data;    
  }
  
  return {    
    fetchWatchlist
  };
}
