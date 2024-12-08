'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Layout, Menu } from 'antd';

const { Header, Content } = Layout;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <html lang="en">
      <body>
        <Layout className="min-h-screen">
          <Header>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link href="/">Home</Link>
              </Menu.Item>
              {isAuthenticated ? (
                <>
                  <Menu.Item key="2">
                    <Link href="/products">Products</Link>
                  </Menu.Item>
                  <Menu.Item key="3" onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item key="4">
                    <Link href="/login">Login</Link>
                  </Menu.Item>
                  <Menu.Item key="5">
                    <Link href="/register">Register</Link>
                  </Menu.Item>
                </>
              )}
            </Menu>
          </Header>
          <Content className="p-8">{children}</Content>
        </Layout>
      </body>
    </html>
  );
}
