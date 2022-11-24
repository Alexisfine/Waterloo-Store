import React from 'react';
import {Card, CardImg} from "react-bootstrap";
import {Link} from 'react-router-dom';

import Rating from "../Rating";

const Product = ({product}) => {
    return (
        <Card className='my-3 py-3 rounded'>
            <Link to={'/products/'+product._id}>
                <CardImg src={product.image} variant='top'></CardImg>
            </Link>
            <Card.Body>
                <Link to={'/products/'+product._id}>
                    <Card.Title>{product.name}</Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={product.rating} numReviews={product.numReviews} color='gold'/>
                </Card.Text>
                <Card.Text as='h3'>
                    <h3>$ {product.price}</h3>
                </Card.Text>
            </Card.Body>

        </Card>

    )
}



export default Product;