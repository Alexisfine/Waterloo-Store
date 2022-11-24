import React, {useEffect} from "react";
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from "react-bootstrap";
import {addToCart, removeFromCart} from "../../actions/cartAction";
import Message from '../../components/Message';

const CartScreen = () => {
    const {id} = useParams();
    const location = useLocation();
    const quantity = location.search ? Number(location.search.split('=')[1]): 1;
    const dispatch = useDispatch();
    const cart = useSelector((state)=>state.cart);
    const {cartItems} = cart;
    const navigate = useNavigate();
    console.log(cartItems)

    useEffect(()=>{
        if (id) {
            dispatch(addToCart(id, quantity))
        }
    }, [dispatch, id, quantity])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Cart</h1>
                {cartItems.length === 0 ? (<Message>Cart is empty <Link to='/'>Return</Link></Message>) :
                    (<ListGroup variant='flush'>
                        {cartItems.map(item =>(
                            <ListGroup.Item>
                                <Row>
                                    <Col md='2'><Image src={item.image} alt={item.name} fluid rounded/></Col>
                                    <Col md='3'><Link to={'/products/'+item.product}>{item.name}</Link></Col>
                                    <Col md='2'>{'$' + item.price}</Col>
                                    <Col md='2'>
                                        <Form.Control as='select' value={item.quantity}
                                         onChange={(e)=>dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {[...Array(item.countInStock).keys()].map(
                                            i => <option key={i+1} value={i+1}>{i+1}</option>
                                        )}
                                        </Form.Control>
                                    </Col>
                                    <Col>
                                        <Button type='button' onClick={()=>{removeFromCartHandler(item.product)}}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>)
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant={"flush"}>
                        <ListGroupItem>
                            <h2>{cartItems.reduce((acc,item)=>
                                acc + item.quantity
                            ,0)} products in total</h2>
                            $ {cartItems.reduce((acc,item)=>
                            acc + item.quantity * item.price,0)}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button type='button' className='block' disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}>Check Out</Button></ListGroupItem>
                    </ListGroup>
                </Card>

            </Col>

        </Row>
    )
}

export default CartScreen;