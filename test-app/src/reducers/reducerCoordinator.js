import { fieldTypes } from "../util/api";
export const initialState = [];
  
const reducerCoordinator = (state = initialState, action) => {
    switch(action.type)
    {
        case fieldTypes.FETCH_COORDINATOR_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}

export default reducerCoordinator;