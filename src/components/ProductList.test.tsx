import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductList from './ProductList';  // Komponen yang akan diuji
import { Product } from '../types';

// Mock data produk
const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    sku: '001',
    image: 'image-url-1',
    price: 100,
    description: 'Description 1',
    category: 'Health',
  },
  {
    id: 2,
    name: 'Product 2',
    sku: '002',
    image: 'image-url-2',
    price: 200,
    description: 'Description 2',
    category: 'Health',
  },
];

describe('ProductList Component', () => {
  it('renders product list correctly', () => {
    render(<ProductList products={products} />);

    // Memeriksa apakah daftar produk muncul
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  it('should display product details when clicked', () => {
    render(<ProductList products={products} />);

    // Klik pada produk pertama
    fireEvent.click(screen.getByText('Product 1'));

    // Memastikan detail produk muncul setelah klik
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });
});
