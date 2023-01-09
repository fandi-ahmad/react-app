import axios from "axios";

const apiUrl = 'http://localhost:8081/ex/v1/event/gate';

export const GetEventGate = (limit, page) => {
    return axios.get(`${apiUrl}`, {
        params: {
            limit: limit,
            page: page
        }
    })
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const UpsertEventGate = (data) => {
    return axios.post(apiUrl, data)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}