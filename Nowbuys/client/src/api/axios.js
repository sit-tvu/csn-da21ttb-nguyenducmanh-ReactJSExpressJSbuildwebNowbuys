
import axios from 'axios'; 

const myaxios = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 5000,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' } 
})

export default myaxios; 
