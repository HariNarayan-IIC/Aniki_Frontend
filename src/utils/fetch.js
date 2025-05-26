import { baseURL } from '../constants';

export async function Fetch(url, options = {}) {
  let res = await fetch(`${baseURL}${url}`, { 
    ...options, 
  });
  return res;
}
