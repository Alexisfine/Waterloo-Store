import React, {useState} from "react";
import { useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Form, Button,} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import FormContainer from "../../components/Form-Container";
import {saveShippingAddress} from "../../actions/cartAction";
import CheckoutStep from "../../components/Checkout-Step";


const ShippingScreen = () => {
    const cart = useSelector(state=>state.cart);
    const {shippingAddress} = cart;
    const [address,setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [province, setProvince] = useState(shippingAddress.province);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, province}));
        navigate('/payment');
    }

    return (
        <FormContainer>
            <CheckoutStep step1 step2 />
            <h1>Mailing Address</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address:</Form.Label>
                    <Form.Control type='address' placeholder='please enter your street address'
                                  value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label>City:</Form.Label>
                    <Form.Control type='text' placeholder='please enter your city'
                                  value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code:</Form.Label>
                    <Form.Control type='text' placeholder='please enter postal code'
                                  value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='province'>
                    <Form.Label>Province:</Form.Label>
                    <Form.Control type='text' placeholder='please enter your province'
                                  value={province} onChange={(e)=>setProvince(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen;