import { fieldTypes } from "../util/api"

export const fetchcoordinator = () => {
    return {
        type: fieldTypes.FETCH_COORDINATOR,
    }
}
export const fetchcoordinatorSuccess = (data) => {
    return {
        type: fieldTypes.FETCH_COORDINATOR_SUCCESS,
        payload: data,
    }
}

export const fetchresponsible = () => {
    return {
        type: fieldTypes.FETCH_RESPONSIBLE,
    }
}
export const fetchresponsibleSuccess = (data) => {
    return {
        type: fieldTypes.FETCH_RESPONSIBLE_SUCCESS,
        payload: data,
    }
}