import React, {useEffect} from "react";
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {createProduct, deleteProduct, listProducts} from "../../actions/productActions";
import {PRODUCT_CREATE_RESET} from "../../constants/productConstants";

const ProductListScreen = () => {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const {loading, error, products} = productList;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const productDelete = useSelector(state => state.productDelete);
    const {loading:loadingDelete, error:errorDelete, success:successDelete} = productDelete;
    const productCreate = useSelector(state=>state.productCreate);
    const {
        loading:loadingCreate,
        error:errorCreate,
        success:successCreate,
        product: productCreated
    } = productCreate;

    const navigate = useNavigate();


    useEffect(()=>{
        dispatch({type:PRODUCT_CREATE_RESET});
        if (!userInfo.isAdmin) {
            navigate('/login');
        }
        if (successCreate) {
            navigate('/admin/product/'+productCreated._id +'/edit');
        } else {
            dispatch(listProducts());
        }
    }, [dispatch, userInfo, successDelete, successCreate, productCreated])


    const deleteHandler = (id) => {
        if (window.confirm('Do you want to delete product ' + id)) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        // Add product
        dispatch(createProduct());
    }

    return (
        <>
            <Row>
                <Col>
                    <h1>Product List</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>Add Product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader/>}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message> }
            {loadingCreate && <Loader/>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message> }
            {loading ? <Loader></Loader> : error ? <Message variant='danger'>{error}</Message> :
                (<Table striped bordered hover responsive className='table-sm'>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product=>(
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>

                            <td>
                                <LinkContainer to={'/admin/product/'+product._id+'/edit'}>
                                    <Button variant='light' className='btn-sm'>
                                        <i className='fas fa-edit'></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger' className='btn-sm'
                                        onClick={()=>deleteHandler(product._id)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>)}
        </>
    )
}

export default ProductListScreen;