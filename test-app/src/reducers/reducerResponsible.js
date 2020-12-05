import { fieldTypes } from "../util/api";
export const initialState = [];
  
const reducerResponsible = (state = initialState, action) => {
    switch(action.type)
    {
        case fieldTypes.FETCH_RESPONSIBLE_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export default reducerResponsible;