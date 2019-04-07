import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import axios from 'axios';

// action type
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

// action creator
export const updateProduct = (productId, managerId) => {
    return {
        type: UPDATE_PRODUCT,
        productId: productId,
        managerId: managerId
    }
}

const initialState = {
    products: [],
    managers: [],
}
const reducer = (state=initialState,action) =>{
    switch (action.type){
        case UPDATE_PRODUCT:
            return {
            }
        default:
            return state
    }
}


const store = createStore(reducer, applyMiddleware(thunk));

export default store;