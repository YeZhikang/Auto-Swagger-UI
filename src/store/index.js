import {createStore} from "redux";

const userReducer = (state={}, action) => {
    switch (action.type) {
        case 'SET':
            return action.value
        case 'DELETE':
            return {}
    }
}


export default createStore(userReducer)
