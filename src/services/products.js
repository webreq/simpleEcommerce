import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'

export const getProducts = createAsyncThunk('getProducts', async(arg)=>{

    const result = await fetch('https://fakestoreapi.com/products?limit=10')
            .then(res=>res.json())
    return result
})

const products = createSlice({
    name:'products',
    initialState:{
        products:[],
        cart:[],
        loading:false,
        error:null
    },
    reducers:{
        addToCart:(state,action)=>{
            let olditems = state.cart.filter(val=> val.id!==action.payload.id)
            let newItems = state.cart.filter(val => val.id===action.payload.id)
            let newQty = newItems.length?newItems[0]?.qty+1:1
            newItems.length?newItems[0]={...action.payload, qty:newQty}:newItems=[{...action.payload,qty:newQty}]
            olditems.push(newItems[0])
            state.cart=olditems
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        deleteItem:(state,action)=>{
            state.cart=state.cart.filter(val=> val.id!=action.payload)
            localStorage.setItem('cart',JSON.stringify(state.cart))
        },
        incrementItem:(state,action)=>{
            state.cart=state.cart?.filter(val=>val.id===action.payload).map(val=>{
                const currentVal = val.qty
                val.qty=currentVal+1
                return val
            })
        },
        decrementItem:(state,action)=>{
            state.cart?.filter(val=>val.id===action.payload).map(val=>{
                const currentVal = val.qty
                if(currentVal==1){
                    val.qty=currentVal
                }else{
                    val.qty=currentVal-1
                }
                return val
            })
        },
        updateCart:(state)=>{
            if(!state.cart.length && localStorage.getItem('cart')){
                try {
                    state.cart=JSON.parse(localStorage.getItem('cart'))
                } catch (error) {
                    if(error) localStorage.removeItem('cart')
                }
            }
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getProducts.fulfilled, (state,action)=>{
            state.products=action.payload
        })
    }
})
export const {addToCart,deleteItem,incrementItem,decrementItem,getCart,updateCart} = products.actions
export default products.reducer