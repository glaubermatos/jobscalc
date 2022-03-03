import axios from 'axios'

const isDevelopment = process.env.NODE_ENV !== 'production'

export const backend = axios.create({
    baseURL: isDevelopment ? 'http://localhost:8080/api' : 'https://jobscalc-api.herokuapp.com/api',
    withCredentials: true,
    auth: {
        username: process.env.JOBSCALC_API_USERNAME,
        password: process.env.JOBSCALC_API_PASSWORD
    }
})