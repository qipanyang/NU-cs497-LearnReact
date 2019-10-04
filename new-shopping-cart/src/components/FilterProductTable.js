import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import {Title} from 'rbx';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      //display: 'flex',
      //flexWrap: 'wrap',
      justifyContent: 'space-around',
      //overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 200,
      height: 100,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    card: {
      maxWidth: 345,
      maxHeight:550
    },
    media: {
      height: 100,
    },
  }),
);

const useSelection = (list) =>
{
  const [selected, setSelected] = useState(list);
  const toggle = (x) =>
    {setSelected(selected.includes(x) ? selected.filter(y=>y !== x) : [x].concat(selected))};
  return [selected, toggle];
};


const ProductTable = ({products}) => {
  
  const classes = useStyles();
  return (
    /*<div className = {classes.root}>*/
      <GridList cellHeight={"auto"} spacing={100}>
        {products.map(product =>(
        <Card className = {classes.card}> 
          <CardActionArea>
            <CardMedia 
              component = "img"
              image = {"data/products/" + product.sku + "_1.jpg"}
            />
            <CardContent>
              <Typography /*align="center"*/>
                {product.title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" align="center">
              Add to Cart
            </Button>
          </CardActions>
        </Card>
        ))
    };
    </GridList>
    //</div>
    );
};

const buttonColor = selected => (selected ? 'primary': 'button');


const ColorSelected = ({state}) => {
  return (
    <Container>
      <Title size={4}>
        Sizes:
        </Title>
      <ButtonGroup spacing={2}>
        {Object.values(sizes).map(size => <Fab color = {buttonColor(state.sizeSelect.includes(size))} onClick={()=>state.sizeToggles(size)}>  {size} </Fab>) };
      </ButtonGroup>
    </Container>
  );
}

export const FilterableProductTable = ({products}) => {  
    const [sizeSelect, sizeToggles] = useSelection(sizes);
    const productsSelected = products.filter(product => sizeSelect.includes(product.size));
  return (
    <React.Fragment>
    <div style={{display:'inline-block'}}>
      <ColorSelected state={{sizeSelect, sizeToggles}} />
    </div>
    &nbsp;
    <div style={{display:'inline-block'}}>
      <ProductTable products = {productsSelected}/> 
    </div>
    </React.Fragment>
         //filterText={this.state.filterText}
         // inStockOnly={this.state.inStockOnly}
        ///>
        //<ProductTable
          //products={products}
          // filterText={this.state.filterText}
          // inStockOnly={this.state.inStockOnly}
        ///>
      

    );
};

//export default FilterableProductTable;