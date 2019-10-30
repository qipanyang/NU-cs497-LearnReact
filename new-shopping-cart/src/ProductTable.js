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


const sizes = ['S', 'M', 'L', 'XL'];

const sizeButtonStyles = makeStyles(theme => ({
    fab: {
      margin: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
const SizeSelector = () => {
    const classes = sizeButtonStyles()
    return (
      <Container spacing={5}>
        <ButtonGroup >       
          {Object.values(sizes).map(size => <Fab className={classes.fab}
        //    color = {buttonColor(state.sizeSelect.includes(size))} onClick={()=>state.sizeToggles(size)}
           >  {size} </Fab>) }  
        </ButtonGroup>
      </Container>
    );
  }


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
    card:{
      display:"flex",
    //   justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: 350,
    //   height: 250,
      paddingTop: 20,
    },
    content:{
      display:"flex",
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }
  }));

export const ProductTable = ({products}) =>{
    const classes = GridCardStyles()
    return(
        <div className={classes.root}>
        <Grid container={true} spacing={4} className={classes.grid} direction="row" alignItems="center">       
        {products.map(product =>
          (<Grid item >
            <Card className={classes.card} style={{width: 300}}>
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
              <SizeSelector/>
          </CardActions>
          <CardActions>
            <Fab variant="extended" color="primary" align="center" >
              Add to Cart
            </Fab>
          </CardActions>
            </Card>
        </Grid>))}
       </Grid>
       </div>
    )
}