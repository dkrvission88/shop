import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCart, fetchCart } from "../Slices/CartSlice";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import CartItem from "../components/CartItem";

const CartScreen = () => {
  let { userInfo } = useSelector((state) => state.user);
  let { items, qty, amount, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    userInfo && dispatch(fetchCart(userInfo._id));
    (items.length === 0) && dispatch(createCart25(userInfo._id))
  }, []);
  return (
    <>
      {!userInfo ? (
        <Message>
          Login first from <Link to={"/login"}>Here</Link>
        </Message>
      ) : (
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {items.length === 0 ? (
              <Message>
                You cart is empty <Link to="/">Go Back</Link>{" "}
              </Message>
            ) : (
              <ListGroup variant="flush">
                {items?.map((item) => (
                  <CartItem id={item.product} qty={item.qty} />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <h2>Subtotal ({qty}) items</h2>${amount}
                </ListGroupItem>
                <ListGroupItem>
                  <Button type="button" style={{ width: "100%" }}>
                    Proceed to Checkout
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default CartScreen;
