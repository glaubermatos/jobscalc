import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://10.90.20.103:8080/api'
})