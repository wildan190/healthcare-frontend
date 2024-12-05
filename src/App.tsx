import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductList from './pages/ProductList';
import 'antd/dist/reset.css';  // Ganti dari 'antd/dist/antd.css' ke 'antd/dist/reset.css' jika menggunakan versi terbaru
import './App.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Healthcare Product List</h1>
        <ProductList />
      </div>
    </QueryClientProvider>
  );
}

export default App;
