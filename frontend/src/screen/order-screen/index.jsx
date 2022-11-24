import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Form, Button, Row, Col, Image, Card, ListGroup, ListGroupItem} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import Message from "../../components/Message";
import {getOrderDetails} from "../../actions/orderAction";
import Loader from "../../components/Loader";

const OrderScreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    const orderDetails = useSelector(state=>state.orderDetails);

    const {order, loading, error} = orderDetails;

    if (!loading) {
        const addDecimals = (number) => {
            return (Math.round(number*100/100).toFixed(2))
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item)=> acc + item.quantity * item.price,0));
    }

    useEffect(()=>{
        if (!order || id !== order._id) {
            dispatch(getOrderDetails(id));
        }
    }, [order, id])


    return (
        loading ? <Loader/> : error? <Message variant='danger'>{error}</Message>:
            <>
                <h1>Order id: {id}</h1>
                <Row>
                    <Col md='8'>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2>Mailing Address:</h2>
                                <p>
                                    <strong>Mailing address:</strong></p>
                                <p>
                                        <strong>Name: {order.user.name}</strong>
                                </p>
                                <p><a href={'mailto:'+order.user.email}>Email: {order.user.email}</a>
                                </p>
                                <p>
                                    {order.shippingAddress.address},{order.shippingAddress.city},
                                    {order.shippingAddress.province}, {order.shippingAddress.postalCode}
                                </p>
                                    {order.isDelivered ? (<Message variant='success'>Status: Delivered at:
                                            {order.deliveredAt}</Message>):
                                        <Message variant='danger'>Status: Not delivered</Message> }


                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Payment Method:</h2>
                                <p> <strong>{order.paymentMethod}</strong>
                                </p>
                                {order.isPaid ? (<Message variant='success'>Status: Paid at:
                                        {order.PaidAt}</Message>):
                                    <Message variant='danger'>Status: Not Paid</Message> }
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Order List:</h2>
                                {order.orderItems.length === 0 ? <Message>Cart is empty</Message>:
                                    (<ListGroup variant='flush'>
                                        {order.orderItems.map((item,index)=>(
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
                                        <Col>${order.itemsPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping Cost:</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total Price:</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>

                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
    )
}

export default OrderScreen;