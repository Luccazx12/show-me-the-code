import React from 'react';

interface IProducts {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  user_id: string;
  activated: boolean;
}

interface Props {
  product: IProducts;
}

const Product: React.FC<Props> = ({ product }) => {
  return (
    <div>
      <strong>Nome:</strong> {product.name || 'não possui nome'} <br />
      <strong>Descrição:</strong> {product.description || 'não possui nome'} <br />
      <strong>Preço:</strong> {product.price || 'não possui nome'}
    </div>
  );
};

export default Product;
