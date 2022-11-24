import React, {useState, useEffect} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {getUserDetails, updateUserDetails} from "../../actions/userAction";
import {USER_UPDATE_PROFILE_RESET} from "../../constants/userConstants";

const ProfileScreen = () => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);


    const navigate = useNavigate();
    const [search, setSearch] = useSearchParams();
    const location = useLocation();


    const dispatch = useDispatch();
    const userDetails = useSelector((state)=>state.userDetails);
    const {loading, error, user} = userDetails;

    const userLogin = useSelector((state)=>state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector((state)=>state.userUpdateProfile);
    const {success} = userUpdateProfile;

    useEffect(()=>{
        if (!userInfo) {
            navigate('/login');
        } else {
            if (!user.name || success) {
                dispatch({type:USER_UPDATE_PROFILE_RESET});
                dispatch(getUserDetails('profile'));
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [dispatch, userInfo, user, success])

    // Update user profile
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch update profile function
        dispatch(updateUserDetails({
            id:user._id,
            name,
            email,
            password,
        }));
    }
    return (
        <Row>
            <Col md='3'>
                <h1>User Profile</h1>
                {success && <Message variant='success'>Update success</Message> }
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

                    <Button type='submit' variant='primary'>Update</Button>
                </Form>

            </Col>
            <Col md='9'>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen;