import React, { useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { Row,Col, Image,ListGroup,Card,Button, ListGroupItem, FormControl, Form} from "react-bootstrap"
import Rating from '../components/Rating';
import products from '../products';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { fetchSingleProduct } from '../Slices/SingleProductSlice';
import { addItem } from '../Slices/CartSlice';

const ProductScreen = () => {
    const [qty,setQty] = useState(1);
    const { product, loading,error } = useSelector(
        (state) => state.singleProduct
      );
    const {userInfo} = useSelector(state=>state.user);
      const dispatch = useDispatch();
    let {id} = useParams();
    useEffect(()=>{
        dispatch(fetchSingleProduct(id));
    },[]);
    let navigate = useNavigate();

    const addToCart = () => { 
        let data={
            user: userInfo?._id,
            item: {
                product: id,
                qty,
                price:product.price,
            }
        }
        userInfo && dispatch(addItem(data))
        navigate(`/cart`);
     }
  return (
    <>
    <Link className='btn btn-light my-3' to={'/'}>Go Back</Link>
    {
        loading?<Loader/>: error? <Message variant='danger'>{error}</Message>:<Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating}
                text={`${product.numReviews} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>
                    Price: ${product.price}
                </ListGroupItem>
                <ListGroupItem>
                    Desciption: {product.description}
                </ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col><strong>${product.price}</strong></Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>{product.countInStock > 0? "In Stock" :"Out of Stock" }</Col>
                        </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && 
                    <ListGroupItem>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                            <Form.Select as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
                               { [...Array(product.countInStock).keys()].map(x => (
                                <option key={x+1} value={x+1}>
                                    {x+1}
                                </option>
                               ))}
                            </Form.Select>
                            </Col>
                        </Row>
                    </ListGroupItem>}
                    <ListGroupItem>
                        <Button onClick={addToCart} className='btn-block' style={{width: "100%"}} type='button' disabled={product.countInStock === 0}>
                            Add to Cart
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    }
    </>
  )
}

export default ProductScreen