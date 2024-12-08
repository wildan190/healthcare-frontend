'use client';

import { useState } from 'react';
import { Button, Form, Input, message, Upload, Select } from 'antd';
import api from '@/services/api';
import { useRouter } from 'next/navigation';

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(''); // Menyimpan URL gambar
  const router = useRouter();

  const categories = ['Health', 'Beauty', 'Fitness', 'Personal Care']; // Ganti kategori sesuai kebutuhan

  const handleImageUpload = (file: any) => {
    // Fungsi untuk meng-upload gambar dan mendapatkan URL
    // Di sini Anda bisa menambahkan logika untuk upload gambar ke server Anda
    // misalnya menggunakan API untuk meng-upload dan mendapatkan URL-nya
    const formData = new FormData();
    formData.append('file', file);

    api.post('/upload', formData)  // Misalnya Anda punya endpoint /upload untuk upload gambar
      .then(response => {
        setImageUrl(response.data.url);  // Asumsikan response mengembalikan URL gambar
        message.success('Image uploaded successfully');
      })
      .catch(error => {
        message.error('Image upload failed');
      });

    // Jangan lupa untuk return false supaya tidak ada upload otomatis
    return false;
  };

  const onFinish = async (values: { name: string; description: string; price: number; sku: string; category: string }) => {
    setLoading(true);
    try {
      // Kirim data produk ke backend, sertakan URL gambar
      const productData = { ...values, image: imageUrl };
      await api.post('/products', productData);
      message.success('Product added successfully!');
      router.push('/');
    } catch (error) {
      message.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          label="SKU"
          name="sku"
          rules={[{ required: true, message: 'Please input the SKU!' }]}
        >
          <Input placeholder="SKU" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the product price!' }]}
        >
          <Input type="number" placeholder="Price" />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select a category">
            {categories.map((category, index) => (
              <Select.Option key={index} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="image"
        >
          <Upload
            customRequest={handleImageUpload} // Menggunakan customRequest untuk meng-handle upload gambar
            showUploadList={false}
          >
            <Button>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit" loading={loading}>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
