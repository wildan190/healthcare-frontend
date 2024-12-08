'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import api from '@/services/api';

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await api.post('/auth/login', values);
      localStorage.setItem('token', response.data.token);
      message.success('Login successful!');
      router.push('/');
    } catch (error) {
      message.error('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Welcome Back!</h2>
          <Form name="login" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" block htmlType="submit" loading={loading}>
                Login
              </Button>
            </Form.Item>
            <div className="text-center mt-4">
              <Link href="/register" className="text-blue-600 hover:text-blue-800 transition duration-300">Don't have an account? Register here</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

