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


export const CartList = ({cartState}) => {
    
    return (
        <div>
        <Title align="center">
            shopping cart
        </Title>
      
      {Object.keys(cartState.cartDict).map((key, val)=>(
        <Grid container>
        <Grid item> {key} : {cartState.cartDict[key]} </Grid>
        {/* <Grid item alignItems="flex-end"> <Button onClick={()=>{cartDictstate.cartTogglesdelete(key)}}> - </Button> </Grid> */}
        </Grid>
        ))
      }
      
      </div>
    )
}