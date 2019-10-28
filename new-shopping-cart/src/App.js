import 'rbx/index.css';
import {Title} from 'rbx';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';

import {ProductTable} from './ProductTable';




function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const App = (props) => {
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
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar className = {{alignItems: 'right',}} position="fixed">
          <Toolbar>
            <Typography variant="h5" align="right">Panyang's shopping cart</Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Container> 
         {/* <Box my={5}>
         <ul>
          {products.map(product => <li key={product.sku}><font size="5" color="blue">{product.title}</font></li>)}
        </ul>
        </Box> */}
        <ProductTable products = {products}/>
      </Container>
    </React.Fragment>
  );
};

export default App;