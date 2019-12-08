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
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';
import { Layout } from 'antd';


import {ProductTable} from './ProductTable';
import {CartList} from './CartList';



const { Header, Footer, Sider, Content } = Layout;


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

const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
    root: {
      //display: 'flex', //add will cause that the table move to right a little bit
      flexWrap: 'wrap',
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      // display: 'flex',
      marginRight: theme.spacing(2),
      // alignItems: 'flex-end',
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'left',
      padding: theme.spacing(0, 1),
      // ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 340,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
      total_price: {
        marginBottom: 20,
        align: 'center',
      },
  }));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 850, //the width of selection menu
    },
  },
};

const useDictSelection = () =>
{
  const removeByKey = (myObj, deleteKey) => {
    return Object.keys(myObj)
      .filter(key => key !== deleteKey)
      .reduce((result, current) => {
        result[current] = myObj[current];
        return result;
    }, {});
  };
  const addone = (myObj, key) => {
    return Object.keys(myObj)
    .reduce((result, current) => {
      current === key ? result[current] = myObj[current] + 1 : result[current] = myObj[current];
      return result;
    }, {});
  };

  const reduceone = (myObj, key) => {
    return Object.keys(myObj)
    .reduce((result, current) => {
      current === key ? result[current] = myObj[current] - 1 : result[current] = myObj[current];
      return result;
    }, {});
  };
  
  const [selected, setSelected] = useState({});
  const toggleadd = (names) => {
    var tmp = selected;
    names.map((name)=>{
      if (Object.keys(tmp).includes(name)){
        tmp = addone(tmp, name) 
      }
      else{
        tmp = Object.assign({[name]: 1}, tmp )
      }
    });
  setSelected(tmp);
  };
  const toggledelete = (name) => {
      setSelected(selected[name]>1 ? reduceone(selected, name) : removeByKey(selected, name))
  };
  return [selected, toggleadd, toggledelete];
};


const App = (props) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [inventory, setinventory] = useState({});
  const products = Object.values(data);
  const [open, setOpen] = React.useState(false);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    const fetchInventory = async () => {
      const response = await fetch('./data/inventory.json');
      const json = await response.json();
      setinventory(json);
    }
    fetchProducts();
    fetchInventory();
  }, []);
  const productsPrice = products.reduce((result, product) => {
    result[product.title] = product.price;
    return result
  }, {})

  const [cartDict, cartTogglesadd, cartTogglesdelete] = useDictSelection();
  const total_price = Object.keys(cartDict).reduce((result, product)=>{
    const tmp = product.split("_")
    return result+cartDict[product]*productsPrice[tmp[0]]
  },0).toFixed(2)
  return (
    <div className={classes.root}>
    <React.Fragment>
      <HideOnScroll {...props}>
        <AppBar className = {classes.appBar} position="fixed">
          <Toolbar>
          <Typography variant="h4" align="center" className={classes.title}>Panyang's shopping cart</Typography>      
            <Button color="inherit" onClick={handleDrawerOpen}>Cart</Button>
          </Toolbar>
            {/* <Typography variant="h3" align="center">Panyang's shopping cart</Typography>
            <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            // className={clsx(classes.menuButton, open && classes.hide)}>
              className={classes.menuButton}>
            <MenuIcon />
            </IconButton>
            </Toolbar> */}
        </AppBar>
      </HideOnScroll>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}>
          <Layout>
            <Content>
          <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronRightIcon/>
          </IconButton>
          </div>
          <CartList cartState={{cartDict, cartTogglesadd, cartTogglesdelete}} productsPrice = {productsPrice} inventoryState = {{inventory, setinventory}}/>
          {/* <Drawer anchor="bottom" open="true">
            <div>totol price: {total_price}</div>
          </Drawer> */}
          </Content>
          <Footer>
          <div class='footer'><Typography variant="h6" align="center" className={classes.total_price}>totol price: {total_price}</Typography></div>
          </Footer>
        </Layout>
      </Drawer>

      <Container> 
        <ProductTable products = {products} cartState={{cartDict, cartTogglesadd, cartTogglesdelete}} openState={{open, setOpen}} inventoryState = {{inventory, setinventory}}/>
      </Container>
    </React.Fragment>
    </div>
  );
};

export default App;