import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchFlashProducts} from './productSlice';
import Card from 'react-bootstrap/Card';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import './product.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.flashItems);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchFlashProducts());
        }
    }, [status, dispatch]);

    if (status === 'loading') {
        return <Spinner animation="border" />;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }
    const menProducts = products.filter(product => product.category === "men's clothing").slice(0, 2);
    const womenProducts = products.filter(product => product.category === "women's clothing").slice(0, 2);

    return (
        <Container>
            <Row>
                <h4 className="heading-text">Flash Sale</h4>
            </Row>
            <Row>
                <div className="product-container">
                    <div className="product-list">
                        {[...menProducts, ...womenProducts]?.map((product, index) => (
                            index < 4 && (
                                <Card key={product?.id} className={`product-card ${product?.category === "men's clothing" ? "men-card" : "women-card"}`}>
                                    <Card.Title className="product-title">{product?.title}</Card.Title>
                                    <Card.Img variant="top" src={product?.image} className="product-image"/>
                                    <Card.Body className="product-body">
                                        <Card.Text className="product-price">Rs {product?.price}</Card.Text>
                                        <Card.Text>Description: {product?.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        ))}
                    </div>
                </div>
            </Row>
            <Row>
                <h4 className="heading-text">Categories</h4>
            </Row>
            <Row>
                <Col md={6}>
                    <Link to="/category/men's clothing" className="category-link">
                        <Card className="category-card men-card">
                            <Card.Body className="cat-body">
                                <Card.Text className="cat-txt">Men's Clothing</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
                <Col md={6}>
                    <Link to="/category/women's clothing" className="category-link">
                        <Card className="category-card women-card">
                            <Card.Body>
                                <Card.Text className="cat-txt">Women's Clothing</Card.Text>
                            </Card.Body>
                        </Card>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
