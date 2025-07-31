import axios from "axios";

export const FrontendClient=axios.create({
    baseURL:"http://localhost:5173/"
})