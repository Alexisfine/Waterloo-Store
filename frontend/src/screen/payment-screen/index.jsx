import React, {useState} from "react";
import { useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Form, Button, Col, FormGroup, FormLabel} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import FormContainer from "../../components/Form-Container";
import {savePaymentMethod} from "../../actions/cartAction";
import CheckoutStep from "../../components/Checkout-Step";

const PaymentScreen = ()=> {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart);
    const {shippingAddress} = cart;
    if (!shippingAddress) {
        navigator('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('Wechat');

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigator('/placeorder');
    }
    return (
        <FormContainer>
            <CheckoutStep step1 step2 step3></CheckoutStep>
            <h1>Payment Method:</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup>
                    <FormLabel as='legend'>Payment Method:</FormLabel>
                    <Col>
                        <Form.Check type='radio' label='WeChat Pay' id='WeChat'
                                    name='paymentMethod' value='WeChat Pay' checked
                        onChange={(e)=>setPaymentMethod((e.target.value))}>
                        </Form.Check>
                        <Form.Check type='radio' label='Paypal' id='Paypal'
                                    name='paymentMethod' value='Paypal'
                                    onChange={(e)=>setPaymentMethod((e.target.value))}>
                        </Form.Check>
                    </Col>
                </FormGroup>
                <Button type='submit' variant='primary'>Continue</Button>

            </Form>
        </FormContainer>
    )
}

export default PaymentScreen