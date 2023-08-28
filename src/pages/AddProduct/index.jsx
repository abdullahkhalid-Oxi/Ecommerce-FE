import { useState } from "react";
import { createContext } from "react";
import { Button, TextField } from "@mui/material";
import "./addproduct.css"

// import "./home.css"
// const CartContext = createContext({})

export const AddProduct = () => {

    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState("")
    const [productDescription, setProductDescription] = useState("")
    const [productImage, setProductImage] = useState("")

    const handleChange = (ev) => {
        const { value, name } = ev.target;
        if (name === "productName") {
            setProductName(value)
        }
        if (name === "productPrice") {
            setProductPrice(value)
        }
        if (name === "productDescription") {
            setProductDescription(value)
        }
        if (name === "productImage") {
            setProductImage(value)
        }
    }

    const handleSubmit = async () => {
        const productData = { productName, productPrice: +productPrice, productDescription, productImage }
        const response = await fetch("http://localhost:4000/products/add", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorizarion: "Bearer ",
            },
            body: JSON.stringify(productData)
        })
    }

    return (
        <div className="rootform">
            <h2>ADD PRODUCT FORM</h2>
            <TextField onChange={handleChange} value={productName} name="productName" fullWidth id="outlined-basic" label="Product Name" variant="outlined" />
            <TextField onChange={handleChange} value={productPrice} name="productPrice" fullWidth id="outlined-basic" label="Price" variant="outlined" />
            <TextField onChange={handleChange} value={productDescription} name="productDescription" multiline rows={4} fullWidth id="outlined-basic" label="Description" variant="outlined" />
            <TextField onChange={handleChange} value={productImage} name="productImage" fullWidth id="outlined-basic" label="Image" variant="outlined" />
            <Button onClick={handleSubmit} fullWidth className="addproductbutton" variant="contained">ADD Product</Button>
        </div>
    )
};


export default AddProduct;