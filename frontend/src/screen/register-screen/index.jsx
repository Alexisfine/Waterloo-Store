import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {register} from "../../actions/userAction";
import FormContainer from "../../components/Form-Container";


const RegisterScreen = () => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);


    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const location = useLocation();


    const dispatch = useDispatch();
    const userRegister = useSelector((state)=>state.userRegister);
    const {loading, error, userInfo} = userRegister;
    const redirect = location.search ? location.search.split('=')[1] : '/';




    useEffect(()=>{
        if (userInfo) navigate(redirect);
    }, [userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch registry function
        if (password !== confirmPassword) setMessage('Passwords do not match');
        else {
            dispatch(register(name, email, password));
        }
    }
    return (
        <FormContainer>
            <h1>Create an account</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type='name' placeholder='please enter your name'
                                  value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
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
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control type='password' placeholder='please enter your password again'
                                  value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>Already have an account? <Link to={redirect ? '/login?redirect='+{redirect} : '/login'}>
                    Login
                </Link></Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;