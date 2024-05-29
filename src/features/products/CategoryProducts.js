import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts } from './productSlice';
import {Container, Row, Card, Spinner} from 'react-bootstrap';
import './product.css';


const CategoryProducts = () => {
    const { categoryName } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        dispatch(fetchProducts(categoryName));
        }, [categoryName, dispatch]);

    if (status === 'loading') {
        return <Spinner animation="border" />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <Row>
                <h4 className="heading-text">{categoryName.replace('-', ' ')}</h4>
            </Row>
            <Row>
                <div className="product-container">
                    <div className="product-list">
                        {products.map((product) => (
                                <Card key={product?.id} className={`product-card ${product?.category === "men's clothing" ? "men-card" : "women-card"}`}>
                                    <Card.Title className="product-title">{product?.title}</Card.Title>
                                    <Card.Img variant="top" src={product?.image} className="product-image"/>
                                    <Card.Body className="product-body">
                                        <Card.Text className="product-price">Rs {product?.price}</Card.Text>
                                        <Card.Text>Description: {product?.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                        ))}
                    </div>
                </div>
            </Row>
        </Container>
    );
};

export default CategoryProducts;
