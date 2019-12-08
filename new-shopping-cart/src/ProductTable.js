import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { Container } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { keys } from '@material-ui/core/styles/createBreakpoints';

const GridCardStyles = makeStyles(theme => ({
  root: {
      display: 'flex',
      // flexWrap: 'wrap',
      // justifyContent: 'space-around',
      // overflow: 'hidden',
    },
  grid: {
    marginLeft: 0,
    marginTop: 75,
    marginRight:10
  //   paddingLeft: -10,
  },
  content:{
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
}));
const CardStyles = makeStyles(theme => ({
  card:{
    display:"flex",
  //   justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: 300,
    height: 750,
    paddingTop: 20,
  },
  content:{
    display:"flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  }
}));

const sizes = ['S', 'M', 'L', 'XL'];

const sizeButtonStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
const SizeSelector = ({sku, sizestate}) => {
    const classes = sizeButtonStyles()
    const hassize = (size) => {
      if (sku[size]>0){return false;}
      return true;
    }
    const buttonColor = selected => (
      selected ? 'secondary' : null
    );
    return (
      <Container spacing={5}>
        <ButtonGroup >       
          {Object.values(sizes).map(size => <Fab className={classes.fab} disabled={hassize(size)} 
          color={buttonColor(sizestate.selectedsizes.includes(size))}
          onClick={()=>{sizestate.setsize(size)}}
        >  
           {size} </Fab>) }  
        </ButtonGroup>
      </Container>
    );
  }

const ProductCard = ({product, cartState, openState, inventoryState}) => {
  const useSelection = () => {
    const [selected, setSelected] = useState([]);
    const toggle = (x) => {
      setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
    };
    return [ selected, toggle ];
  };
  const classes = CardStyles();
  const [selectedsizes, setsize] = useSelection()
  const hasstock = (sku) =>{
    var flag = false;
    for (var key in inventoryState.inventory[sku]){
      if (inventoryState.inventory[sku][key]>0){
        flag = true;
        break;
      }
    }
    return flag
  }
  const add2cart = () => {
    var d = inventoryState.inventory
    for(var size of selectedsizes){
      if(d[product.sku][size] == 0){
        setsize(size)
      }
    }
    var addlist = selectedsizes.reduce((result, size)=>{
      if (d[product.sku][size] > 0){
        result.push(product.title+"_"+size+"_"+product.sku);
      }
      return result}
      , []);
    cartState.cartTogglesadd(addlist);
    console.log(d[product.sku])
    for(var size of selectedsizes){
      if (d[product.sku][size]>0){
        d[product.sku][size] -= 1;
      }
      if(d[product.sku][size] == 0){
        setsize(size)
      }
    }
    console.log(d[product.sku])
    inventoryState.setinventory(d);
    openState.setOpen(true);
  }
  return(
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography align="center">
                <font size={4}><strong>{product.title}</strong></font>
              </Typography>
              <Typography align="center">
                ${product.price}
              </Typography>
            </CardContent>
            <CardMedia 
              component = "img"
              image = {"data/products/" + product.sku + "_1.jpg"}
            />
            <Typography align="center">
                <i>{product.style}</i>
              </Typography>
          </CardActionArea>
          <CardActions>
              {hasstock(product.sku) ? 
              <SizeSelector sku={inventoryState.inventory[product.sku]} sizestate={{selectedsizes, setsize}}/> 
              : <Typography variant="h4" align="center"> out of stock </Typography>}
          </CardActions>
          <CardActions>
            <Fab variant="extended" color="primary" align="center" onClick={()=>{add2cart();}} disabled={!hasstock(product.sku)}>
              Add to Cart
            </Fab>
          </CardActions>
            </Card>
  )
}


export const ProductTable = ({products, cartState, openState, inventoryState}) =>{
    const classes = GridCardStyles()
    
    return(
        <div className={classes.root}>
        <Grid container={true} spacing={4} className={classes.grid} direction="row" alignItems="center">       
        {products.map(product =>
          (<Grid item >
            <ProductCard product={product} cartState={cartState} openState={openState} inventoryState={inventoryState}/>
        </Grid>))}
       </Grid>
       </div>
    )
}

