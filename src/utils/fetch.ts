import { useSpinner } from 'utils/client';

export function useFetch() {
  const { showSpinner, hideSpinner } = useSpinner();

  async function getData(url = '') {  
    showSpinner();
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'        
      },
      redirect: 'follow',
    });
    hideSpinner();
    return response.json();
  }

  async function postData(url = '', data = {}) {  
    showSpinner();
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'        
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    });
    hideSpinner();
    return response.json();
  }

  async function putData(url = '', data = {}) {  
    showSpinner();
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'        
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    });
    hideSpinner();
    return response.json();
  }

  async function deleteData(url = '') {  
    showSpinner();
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'        
      },      
    });
    hideSpinner();
    return response.json();
  }
  
  return { getData, postData, putData, deleteData };
}
