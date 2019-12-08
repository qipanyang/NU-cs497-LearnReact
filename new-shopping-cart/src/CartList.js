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
import {Title} from 'rbx';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import ExposurePlus1Icon from '@material-ui/icons/ExposurePlus1';


const useStyles = makeStyles(theme => ({
  root: {
    //display: 'flex', //add will cause that the table move to right a little bit
    flexWrap: 'wrap',
    flexGrow: 1,
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
}));
export const CartList = ({cartState, productsPrice, inventoryState }) => {
  console.log(cartState.cartDict);
  const classes = useStyles();
  const getname = (key)=>{
    return key.split("_")[0]
  };
  const getsize = (key)=>{
    return key.split("_")[1]
  }
  const getsku = (key)=>{
    return key.split("_")[2]
  }
  const addinventory = (key)=>{
    var size = getsize(key);
    var sku = getsku(key);
    var d = inventoryState.inventory
    d[sku][size] += 1;
    inventoryState.setinventory(d);
  }
  const removeinventory = (key) => {
    var size = getsize(key);
    var sku = getsku(key);
    var d = inventoryState.inventory
    d[sku][size] -= 1;
    inventoryState.setinventory(d);
  }
  const hassize = (key) => {
    if (inventoryState.inventory[getsku(key)][getsize(key)]>0){return false;}
    return true;
  }
    return (
        <div>
        <Title align="center">
            shopping cart
        </Title>
      
      {Object.keys(cartState.cartDict).map((key, val)=>(
        <Grid container key = {key}>
        <Grid item key={key}> 
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography align="center">
                <font size={3}><strong>{getname(key)}:</strong></font>
              </Typography>
              <Typography align="center">
              Quantity:{cartState.cartDict[key]}     Size:{getsize(key)}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
          <Fab color="primary" aria-label="add" size='small' onClick={()=>{cartState.cartTogglesdelete(key);addinventory(key)}}>
            <ExposureNeg1Icon />
          </Fab>
          <Fab color="primary" aria-label="add" size='small' onClick={()=>{cartState.cartTogglesadd([key]);removeinventory(key)}} disabled={hassize(key)}>
            <ExposurePlus1Icon />
          </Fab>
          </CardActions>
            </Card>
        </Grid>
        </Grid>
        ))
      }
      
      </div>
    )
}