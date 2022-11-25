import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

//components
import Header from "../../components/frontend/Header";

// styles
import "../../styles/productlist.css";

// Icons
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

// MUI
import {
  Card,
  CardContent,
  CardHeader,
  ListItem,
  List,
  Typography,
  Divider,
} from "@mui/material";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Footer from "../../components/frontend/Footer";

const ProductList = () => {
  const hoverProduct = {
    margin: "5px",
    padding: '1em',
    "&:hover": {
      boxShadow: 8,
    },
  };

  const [product, setProduct] = useState([]);

  const productCollectionRef = collection(db, "Product");

  // Read all the product
  useEffect(() => {
    const getProduct = async () => {
      const data = await getDocs(productCollectionRef);
      setProduct(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProduct();
  }, []);

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Header />
      <div className="product-container">
        <Paper className="category-container" elevation={2}>
          <h3>Category:</h3>
          <List sx={{ display: "grid" }}>
            <Link>
              <Divider />
              <ListItem>
                Pet Food
                <ArrowRightIcon />
              </ListItem>
            </Link>
            <Link>
              <Divider />
              <ListItem>
                Pet Supplement
                <ArrowRightIcon />
              </ListItem>
            </Link>
            <Link>
              <Divider />
              <ListItem>
                Pet Accessories
                <ArrowRightIcon />
              </ListItem>
            </Link>
            <Link>
              <Divider />
              <ListItem>
                Pet Cage
                <ArrowRightIcon />
              </ListItem>
            </Link>
            <Link>
              <Divider />
              <ListItem>
                Bowls and Feeders
                <ArrowRightIcon />
              </ListItem>
            </Link>
            <Link>
              <Divider />
              <ListItem>
                Pet Treats
                <ArrowRightIcon />
              </ListItem>
            </Link>
          </List>
        </Paper>
        <Paper className="allproduct">
          <Paper className="productheader" elevation={2}>
            <Typography variant='h3'><b>Product List</b></Typography>
            {/* <h4>Sort by: </h4>
            <div className="dropdown">
              <Link href="/myaccount">
                A-Z
                <ArrowDropDownIcon />
              </Link>
              <div className="dropdown-content">
                <Link>A-Z</Link>
                <Link>Z-A</Link>
                <Link>Price: Lowest to Highest</Link>
                <Link>Price: Highest to Lowest</Link>
              </div>
            </div>

            <IconButton sx={{ padding: "0" }}>
              <ArrowLeftIcon />
            </IconButton>
            <p>1</p>
            <IconButton sx={{ padding: "0" }}>
              <ArrowRightIcon />
            </IconButton> */}
          </Paper>
          <div className="product-list">
            {product.map((product) => {
              return (
                <Card className="product" sx={hoverProduct}>
                  <Link to={"/product/" + product.id}>
                    <div className="img-container">
                      <img src={product.ImageURL} alt="Product-image" />
                    </div>
                    <Typography variant="title">
                      <b>{product.ProdName}</b>
                    </Typography>
                    <Typography variant="subtitle1">
                      ₱ {product.Price.toLocaleString()}
                    </Typography>
                    <Typography variant="subtitle2">
                      In Stock, {product.Quantity} Unit
                    </Typography>
                  </Link>
                </Card>
              );
            })}
          </div>
        </Paper>
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
