import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {getUserDetails, updateUser} from "../../actions/userAction";
import FormContainer from "../../components/Form-Container";
import {USER_UPDATE_RESET} from "../../constants/userConstants";


const UserEditScreen = () => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const {id} = useParams();
    const navigate = useNavigate();
    const userDetails = useSelector((state)=>state.userDetails);
    const {loading, error, user} = userDetails;
    const userUpdate = useSelector((state)=>state.userUpdate);
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = userUpdate;


    useEffect(()=>{
        if (successUpdate) {
            dispatch({type:USER_UPDATE_RESET});
            navigate('/admin/userlist');
        }
        if (!user.name || user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, user, id, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({
            _id: id,
            name,
            email,
            isAdmin,
        }));
    }
    return (
        <FormContainer>
            <Link to={'/admin/userlist'} className='btn btn-dark my-3'>Return</Link>
            <h1>Edit User Profile</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate  && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message> :
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
                    <Form.Group controlId='isAdmin'>
                        <Form.Check type='checkbox' label='Is Admin' checked={isAdmin}
                                    onChange={(e)=>setIsAdmin(e.target.checked)}>

                        </Form.Check>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            }
        </FormContainer>
    )
}

export default UserEditScreen;