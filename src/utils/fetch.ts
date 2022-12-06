export function useFetch() {

  async function getData(url = '') {  
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'        
      },
      redirect: 'follow',
    });
    return response.json();
  }

  async function postData(url = '', data = {}) {  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'        
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async function putData(url = '', data = {}) {  
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'        
      },
      redirect: 'follow',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  async function deleteData(url = '') {  
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'        
      },      
    });
    return response.json();
  }
  
  return { getData, postData, putData, deleteData };
}
