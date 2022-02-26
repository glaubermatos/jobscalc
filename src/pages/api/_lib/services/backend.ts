import axios from 'axios'

export const backend = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
    auth: {
        username: process.env.JOBSCALC_API_USERNAME,
        password: process.env.JOBSCALC_API_PASSWORD
    }
})