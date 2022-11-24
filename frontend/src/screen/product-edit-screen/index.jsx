import React, {useState, useEffect} from "react";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap';
import {useDispatch,useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {listProductDetails, updateProduct} from "../../actions/productActions";
import FormContainer from "../../components/Form-Container";
import {PRODUCT_UPDATE_RESET} from "../../constants/productConstants";
import axios from "axios";


const ProductEditScreen = () => {
    const {id} = useParams();
    const [name,setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productDetails = useSelector((state)=>state.productDetails);
    const {loading, error, product} = productDetails;

    const productUpdate = useSelector((state)=>state.productUpdate);
    const {loading:loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate;


    useEffect(()=>{
        if (successUpdate) {
            dispatch({type:PRODUCT_UPDATE_RESET});
            navigate('/admin/productlist');
        } else {
            if (!product.name || product._id !== id) {
                dispatch(listProductDetails(id));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }

    }, [dispatch, product, id, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProduct({
            _id:product._id,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description,
        }))
    }

    const uploadFileHandler = async (e) => {
        // Get file
        const file = e.target.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append('image', file);
        console.log(formData.entries())
        setUploading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'multerpart/form-data',
                },
            }
            const {data} = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
    }

    return (
        <FormContainer>
            <Link to={'/admin/productlist'} className='btn btn-dark my-3'>Return</Link>
            <h1>Edit Product Info</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{error}</Message>}

            {loading ? <Loader/> : error? <Message variant='danger'>{error}</Message> :
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type='name' placeholder='please enter name'
                                      value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='price'>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control type='number' placeholder='please enter cost'
                                      value={price} onChange={(e)=>setPrice(Number(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='image'>
                        <Form.Label>Image:</Form.Label>
                        <Form.Control type='text' value={image}
                                      onChange={(e)=>setImage(e.target.value)}>
                        </Form.Control>
                        <Form.Control type='file' label='choose image to upload'
                            onChange={uploadFileHandler}>
                        </Form.Control>
                        {uploading && <Loader/>}


                    </Form.Group>
                    <Form.Group controlId='brand'>
                        <Form.Label>Brand:</Form.Label>
                        <Form.Control type='text' placeholder='please enter brand'
                                      value={brand} onChange={(e)=>setBrand(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='countInStock'>
                        <Form.Label>Count in stock:</Form.Label>
                        <Form.Control type='number' placeholder='please enter stock'
                                      value={countInStock} onChange={(e)=>setCountInStock(Number(e.target.value))}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='category'>
                        <Form.Label>Category:</Form.Label>
                        <Form.Control type='text' placeholder='please enter category'
                                      value={category} onChange={(e)=>setCategory(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='description'>
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type='text' placeholder='please enter description'
                                      value={description} onChange={(e)=>setDescription(e.target.value)}></Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            }
        </FormContainer>
    )
}

export default ProductEditScreen;