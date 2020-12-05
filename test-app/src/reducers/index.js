import {combineReducers} from 'redux';
import reducerCoordinator from './reducerCoordinator';
import reducerResponsible from './reducerResponsible'

const allReducers = combineReducers({
    coordinator: reducerCoordinator,
    responsible: reducerResponsible,
});

export default allReducers
