import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000, 
    headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json' 
    }
});

export default clienteAxios;