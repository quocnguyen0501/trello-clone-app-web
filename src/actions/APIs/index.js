import axios from "axios"
import { API_ROOT } from "utilities/Constants"

export const fetchBoardDetail = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);

    return request.data;
}

export const createNewColumn = async (newColumn) => {
    const request = await axios.post(`${API_ROOT}/v1/columns`, newColumn);

    return request.data;
}

/**
 * update: change title
 * remove: change state of _destroy: false -> true
 */
export const updateColumn = async (idColumnUpdate, columnUpdate) => {
    const request = await axios.put(`${API_ROOT}/v1/columns/${idColumnUpdate}`, columnUpdate);

    return request.data;
}

export const createNewCard = async (newCard) => {
    const request = await axios.post(`${API_ROOT}/v1/cards`, newCard);

    return request.data;
}