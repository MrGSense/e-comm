import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Loading from '../components/Loading';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
          {products.length === 0 && (
            <Message variant='info'>
              No products match your search criteria
            </Message>
          )}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
