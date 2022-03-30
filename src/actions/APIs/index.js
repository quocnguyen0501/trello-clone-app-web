import axios from "axios"
import { API_ROOT } from "utilities/Constants"

export const fetchBoardDetail = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);
    console.log(request);
    return request.data;
}