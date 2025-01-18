import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const url = 'https://go-ticketing-system.onrender.com';

// const url = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';


const Api: AxiosInstance = axios.create({ baseURL: url + "/api" })

Api.interceptors.request.use(async config => {
    const token = localStorage.getItem("token"); // Use localStorage for web apps

    if (token) config.headers.Authorization = `Bearer ${token}`

    return config
})

Api.interceptors.response.use(
    (res: AxiosResponse) => res.data, // Return the data directly
    (err: AxiosError) => Promise.reject(err) // Forward the error for handling
)

export { Api }