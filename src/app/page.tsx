'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, message } from 'antd';
import api from '@/services/api';
import ProductList from '@/components/ProductList';  // Mengimpor ProductList
import Link from 'next/link';

const HomePage = () => {
  const [products, setProducts] = useState<any[]>([]);  // Bisa disesuaikan dengan tipe produk Anda
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchProducts();
    }
  }, [router]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to load products');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Button type="primary" onClick={handleLogout}>Logout</Button>
      </div>
      {/* Menggunakan komponen ProductList untuk menampilkan produk */}
      <ProductList products={products} loading={loading} />
      
      {/* Tombol untuk menambah produk */}
      <Link href="/add-product">
        <Button type="primary" className="fixed bottom-6 right-6">
          Add Product
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
