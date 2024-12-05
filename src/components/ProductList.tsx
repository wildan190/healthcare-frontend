import React from 'react';
import { Card, Col, Row } from 'antd';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <Row gutter={16}>
      {products.map((product) => (
        <Col span={8} key={product.id}>
          <Card
            hoverable
            cover={<img alt={product.name} src={product.image || 'https://via.placeholder.com/150'} />}
          >
            <Card.Meta title={product.name} description={`Price: $${product.price}`} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
