import { createStore, combineReducers } from "redux";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET':
            return action.value
        case 'DELETE':
            return {}
        default:
            return state
    }
}

const projectReducer = (state = {}, action) => {
    switch (action.type) {
        case 'PROJECTSET':
            return action.value
        default:
            return state
    }
}

const projectInfoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SETAPIPROJECT':
            return action.value
        default:
            return state
    }
}

const reducer = combineReducers({
    userReducer,
    projectReducer,
    projectInfoReducer
})


export default createStore(reducer)
