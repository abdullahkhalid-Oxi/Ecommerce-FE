import { useNavigate, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CartContext from "../../context/cartcontext";
import { useContext, useEffect, useState } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Product = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState({});
  const cartContext = useContext(CartContext);
  const { removeFromCart, addToCart } = cartContext;
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchSingleProduct = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:8000/products/${id}`);
    const data = await response.json();
    setSingleProduct(data.product);
    setLoading(false);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    navigate("/");
  };

  useEffect(() => {
    fetchSingleProduct();
    const isUser = localStorage.getItem("user");
    if (isUser) {
      setUser(isUser);
    }
  }, []);

  return (
    <div>
      <Container>
        {loading ? (
          <>
            <CircularProgress />
          </>
        ) : (
          <>
            {user ? (
              <div>
                <IconButton onClick={() => navigate(`/products/edit/${id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              <></>
            )}

            <h3>{singleProduct.productName}</h3>
            <img src={singleProduct.image} />
            <h3>Rs. {singleProduct.price}</h3>
            <p>{singleProduct.description}</p>
            <Button onClick={() => addToCart(singleProduct)} variant="primary">
              Add to Cart
            </Button>
            <Button
              onClick={() => removeFromCart(singleProduct.productName)}
              variant="primary"
            >
              Remove
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default Product;
















// import { useParams } from "react-router-dom";
// import { products } from '../../data/products'
// import { useContext, useState } from "react";
// import CartContext from "../../context/cartcontext";
// import Header from "../../components";

// const Product = () => {

//     //Explanation in the END.
//     const { anything } = useParams();
//     // console.log("just "+{anything}+useParams());
//     // console.log("any : " + anything);

//     const cartContext = useContext(CartContext)

//     // const cartItems = cartContext.cartItems;     //same as BELOW.
//     const { cartItems, addToCart, removeFromCart } = cartContext;

//     const findProductbyname = products.find((item) => {
//         return item.name == anything;
//     })

//     // console.log("cart items " + {cartItems});
//     console.log(cartItems)

//     // console.log("we found " + findProductbyname)  //"FindProductbyname" is object it need to destrcture as well.
//     // console.log("use param "+useParams());  

//     return <div>
//         <Header/>
//         <h1> {anything} Page  </h1>
//         <img src={findProductbyname.image} alt="Error" />
//         <h3>{findProductbyname.description}</h3>
//         <h3>{findProductbyname.price}</h3>
//         <button onClick={() => addToCart(findProductbyname)} > Add to Cart</button>
//         <button onClick={() => removeFromCart(findProductbyname)} > Remove to Cart</button>
//     </div>
// }

// export default Product;

//  // let person = {
//     //     firstname: "Abdullah",
//     //     lastname: "Khalid",
//     // };
//     // const { firstname: fname, lastname } = person;
//     // console.log("Extracted 1: " + fname)
//     // console.log("Extracted 2: " + lastname)
