import React from 'react';
import { Card, Col, Row, Spin, Modal, Button } from 'antd';
import { useQuery } from 'react-query';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  sku: string;
  price: number;
  description: string | null;
  image: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

const ProductList: React.FC = () => {
  const { data, error, isLoading } = useQuery<Product[]>('products', fetchProducts);

  if (isLoading) {
    return <Spin tip="Loading..." />;
  }

  if (error instanceof Error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Row gutter={16}>
      {data?.map((product) => (
        <Col span={8} key={product.id}>
          <Card
            hoverable
            cover={<img alt={product.name} src={`http://localhost:5001/${product.image}`} />}
          >
            <Card.Meta title={product.name} description={`Price: $${product.price}`} />
            <Button 
              style={{ marginTop: '10px' }} 
              onClick={() => Modal.info({
                title: product.name,
                content: (
                  <div>
                    <p>{product.description || 'No description available'}</p>
                    <p><strong>SKU:</strong> {product.sku}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                  </div>
                ),
                onOk() {},
              })}>
              View Details
            </Button>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default ProductList;
