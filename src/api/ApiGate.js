import axios from 'axios';

const apiUrl = 'http://localhost:8081/ex/v1/gate';

export const GetGate = (limit, page) => {
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

export const UpsertGate = (data) => {
    return axios.post(`${apiUrl}`, data)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const DeleteGate = (id) => {
    return axios.delete(`${apiUrl}/${id}`)
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}
