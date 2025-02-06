import axios from "axios";

export const axiosInst = axios.create({
    baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights',
    headers: {
        'x-rapidapi-key': import.meta.env.VITE_API_KEY,
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    }
});



