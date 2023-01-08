import axios from "axios";

const apiUrl = 'http://localhost:8081/ex/v1/event'

export const apiGetList = (limit, page, search) => {
    return axios.get(`${apiUrl}?limit=${limit}&page=${page}&search=${search}`)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}