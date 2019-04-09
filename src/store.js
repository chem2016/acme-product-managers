import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import axios from 'axios';

// action type
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_MANAGERS = 'SET_MANAGERS'

// action creator
const updateProduct = (productId, managerId) => {
    return {
        type: UPDATE_PRODUCT,
        productId: productId,
        managerId: managerId
    }
}
const setProducts = (products) => {
    return {
        type: SET_PRODUCTS,
        products: products
    }
} 
const setManagers = (managers) => {
    return {
        type: SET_MANAGERS,
        managers: managers
    }
}

const initialState = {
    products: [],
    managers: [],
}
const reducer = (state=initialState,action) =>{
    switch (action.type){
        case SET_PRODUCTS:  
            return {...state, products: action.products}
        case SET_MANAGERS:
            return {...state, managers: action.managers}
        default:
            return state
    }
}

const fetchProducts = () =>{
    return (dispatch)=>{
        return axios.get('/api/products')
            .then(res=>res.data)
            .then(products=>dispatch(setProducts(products)))
    }   
}

const fetchManagers = () => {
    return (dispatch)=>{
        return axios.get('/api/users')
            .then(res=>res.data)
            .then(managers=>dispatch(setManagers(managers)))
    }
}

const updateProductThunk = () => {
    return (dispatch) => {
        return axios.put(`/api/products/${this.props.product.id}`)
    }
}


const store = createStore(reducer, applyMiddleware(thunk));

export default store;
export { fetchProducts, fetchManagers }