'use client';

import { useEffect, useState } from 'react';
import { List, Card, message } from 'antd';
import api from '@/services/api';

interface Product {
  id: number;
  name: string;
  sku: string;
  image: string;
  price: number;
  description?: string;
  category: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        message.error('Failed to fetch products');
      }
    };
    

    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={products}
        renderItem={(product) => (
          <List.Item>
            <Card title={product.name} cover={<img alt={product.name} src={product.image} />}>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Category:</strong> {product.category}</p>
              {product.description && <p><strong>Description:</strong> {product.description}</p>}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProductList;
