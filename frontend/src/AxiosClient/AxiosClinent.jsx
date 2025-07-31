import axios from 'axios';

export const axiosClient=axios.create({
    baseURL:"http://localhost:9090/api/"
})