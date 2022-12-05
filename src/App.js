import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/cart";
import Header from "./components/header";
import Products from "./components/products";
import { addToCart, decrementItem, deleteItem, getProducts, incrementItem, updateCart } from "./services/products";

function App() {
  const dispatch = useDispatch()
  const {products,cart} = useSelector(state=> state.products)
  const [isOpen,setIsOpen]= useState(false)
  const handleOpen = ()=> setIsOpen(!isOpen)
  const addtocart = (id)=> dispatch(addToCart(id))
  const handleDelete =(id)=> dispatch(deleteItem(id))
  const handleIndrement = (id)=> dispatch(incrementItem(id))
  const handleDecrement = (id)=> dispatch(decrementItem(id))
  useEffect(()=>{
    dispatch(getProducts())
    dispatch(updateCart())
  },[])
  return (
    <div className="w-full h-screen">
      {/* header */}
      <Header cartCount={cart} handleOpen={handleOpen} />
      {/* products */}
      {isOpen?<Cart product={cart} deleteItem={handleDelete} increment={handleIndrement} decrement={handleDecrement} />: 
      <Products products={products} addtocart={addtocart} />}
    </div>
  );
}

export default App;
