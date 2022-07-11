import {createSlice} from "@reduxjs/toolkit"
import storage from 'redux-persist/lib/storage'

const cartSlice = createSlice({
    name:"cart",
    initialState: {
        products:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addProduct:(state, action)=> {
            state.quantity += 1
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        },
        resetSkill:(state, action) => {
            storage.removeItem('root')
            state.quantity = 0
            state.products = []
            state.total = 0
        },
        removeProduct: (state, action) => {
            const {product} = action.payload
            let lexval = 0
            for (let i = 0; i < state.quantity; i++) {
                if(product._idCart === state.products[i]._idCart){
                    lexval = i
                }
            }
            let decrement = product.price * product.quantity
            state.products.splice(lexval, 1)
            state.products = [...state.products]
            state.quantity -= 1
            if(state.quantity <= 0) state.quantity = 0
            state.total -= decrement
            if(state.total <= 0) state.total = 0
        }
    },
});

export const { addProduct, resetSkill, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;