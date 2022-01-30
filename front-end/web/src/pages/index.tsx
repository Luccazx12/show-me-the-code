import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import animeImg from '../assets/img.jpg';
import api from '../services/api';

import Product from '../components/Product';

interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
  activated: boolean;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    api.get<IProduct[]>('/allProducts').then(response => {
      setProducts(response.data);
      console.log(response);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Homepage</title>
      </Head>

      <main>
        <img src={animeImg} alt="some text" />
        {products.map(product => (
          <Product key={product.id} product={product}></Product>
        ))}

        <h1>Descrições</h1>
        {products.map(pod => (
          <h3>{pod.description}</h3>
        ))}
      </main>
    </div>
  );
};

export default Home;
