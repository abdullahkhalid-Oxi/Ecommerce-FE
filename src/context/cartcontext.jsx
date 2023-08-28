import { useState } from "react";
import { createContext } from "react";

const CartContext = createContext({})

export const CartContainer = ({ children }) => {

    const [cartItems, setcartItems] = useState([]);

    const addToCart = (newItem) => {
        const existingProduct = cartItems.find(
            (product) => product.name === newItem.name)

        if (existingProduct) {
            return
        }
        const items = [...cartItems, newItem]
        setcartItems(items);
    }

    const removeFromCart = (tname) => {
        const filtereditems = cartItems.filter((item) => { item.name !== tname }
        );
        setcartItems(filtereditems);
        console.log("Console")
        console.log(cartItems)
    }

    return (
        <CartContext.Provider value={{
            cartItems, addToCart, removeFromCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}


export default CartContext;