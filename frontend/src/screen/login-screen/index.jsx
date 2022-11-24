import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {login} from "../../actions/userAction";
import FormContainer from "../../components/Form-Container";


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const location = useLocation();
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const dispatch = useDispatch();
    const userLogin = useSelector(state=>state.userLogin);
    const {loading, error, userInfo} = userLogin;

    useEffect(()=>{
        if (userInfo) navigate(redirect);
    }, [userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch login function
        dispatch(login(email,password));
    }
    return (
        <FormContainer>
            <h1>Login</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control type='email' placeholder='please enter your email'
                    value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type='password' placeholder='please enter your password'
                                  value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>Login</Button>
            </Form>
            <Row className='py-3'>
                <Col>New user? <Link to={redirect? '/register?redirect='+{redirect}: '/register'}>
                    Create an account
                </Link></Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;