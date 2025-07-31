import axios from 'axios';

export const BackendClient=axios.create({
    baseURL:"http://localhost:9090/api/"
})