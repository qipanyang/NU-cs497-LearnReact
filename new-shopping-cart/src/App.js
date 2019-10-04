import 'rbx/index.css';
import {Title} from 'rbx';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';


import {FilterableProductTable} from './components/FilterProductTable';





const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    // <ul>
    //   {products.map(product => <li key={product.sku}>{product.title}</li>)}
    // </ul>
    <Container>
    <Title>
      Buy Your T-shirt!
    </Title>
    <FilterableProductTable products = {products} />
    </Container>
  );
};

export default App;