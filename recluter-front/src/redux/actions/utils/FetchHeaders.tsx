import getIp from './GetIp';

const API_URL = process.env.REACT_APP_API_BASE_URL;

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

async function FetchWithIP(endpoint: string, options: FetchOptions = {}, data?: any): Promise<any> {
  const url = `${API_URL}${endpoint}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  console.log(timeZone , " zona horaria")
  const headers: HeadersInit = {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      'Timezone': timeZone, 
      
  };
  
  if (options.method !== 'GET') {
      const ip = await getIp();
      headers['ip'] = ip;
      console.log('aqui estoy')
  }

  let body: any;
  if (data instanceof FormData) {
      body = data;
      console.log('aqui estoy2')
  } else if (data && options.method !== 'GET') {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
      console.log('aqui estoy3')
  } 

  const response = await fetch(url, {
      method: options.method || "POST",
       headers,
       body,

  });

  return response;
}

export async function FetchWithIPGet(endpoint: string, options: FetchOptions = {}, data?: any): Promise<any> {
    const url = `${API_URL}${endpoint}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(timeZone, "zona horaria");

    const headers: HeadersInit = {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Timezone': timeZone,
    };

    let body: any;
    
    if (data instanceof FormData) {
        body = data;
        console.log('FormData detected');
    } else if (data) {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
        console.log(body,'JSON data detected');
    }

    if (options.method === 'GET' && data) {
        // Aunque no es estándar, algunos servicios podrían aceptar un body en GET.
        // Sin embargo, algunos navegadores y proxies podrían ignorar esto.
        console.log('GET request with body');
    } else if (options.method !== 'GET') {
        const ip = await getIp();
        headers['ip'] = ip;
        console.log('Non-GET request, IP header added');
    }

    const response = await fetch(url, {
        method: options.method || "POST",
        headers,
        body: options.method === 'GET' ? body : body, // Permitir body en GET
    });

    return response;
}

export default FetchWithIP;
