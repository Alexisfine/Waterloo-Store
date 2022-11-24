import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Form, Button, Row, Col, Image, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import Message from "../../components/Message";
import CheckoutStep from "../../components/Checkout-Step";
import {createOrder} from "../../actions/orderAction";

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addDecimals = (number) => {
        return (Math.round(number*100/100).toFixed(2))
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item)=> acc + item.quantity * item.price,0));
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 0.01 * cart.itemsPrice);
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice));

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    const orderCreate = useSelector(state=>state.orderCreate);
    const {order, success, error} = orderCreate;
    useEffect(()=>{
        if (success) {
            navigate('/order/'+order._id);
        }
    }, [success]);


    return (
        <>
        <CheckoutStep step1 step2 step3 step4/>
            <Row>
                <Col md='8'>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Mailing Address:</h2>
                            <p>
                                <strong>{cart.shippingAddress.address},{cart.shippingAddress.city},
                                    {cart.shippingAddress.province}, {cart.shippingAddress.postalCode}
                                </strong></p>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method:</h2>
                            <strong>{cart.paymentMethod}</strong>
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order List:</h2>
                            {cart.cartItems.length === 0 ? <Message>Cart is empty</Message>:
                                (<ListGroup variant='flush'>
                                    {cart.cartItems.map((item,index)=>(
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md='1'>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>
                                                <Col>
                                                    <Link to={'/products/'+item.product}>{item.name}</Link>
                                                </Col>
                                                <Col md='4'>
                                                    {item.quantity} X {item.price} = ${item.quantity*item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}

                                </ListGroup>)}
                        </ListGroupItem>
                    </ListGroup>
                </Col>

                <Col md='4'>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Total Price:</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Product(s):</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping Cost:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total Price:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroupItem>
                            <ListGroupItem>
                                <Button type='button' className='btn-block' onClick={placeOrderHandler}
                                disabled={cart.cartItems === 0}>
                                    Order
                                </Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen;