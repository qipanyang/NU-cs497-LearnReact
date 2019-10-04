import React, { useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Title } from 'rbx';
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer({cartDict}) {
    const classes = useStyles();
    const [state, setState] = useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
  
    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };
  
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        //onKeyDown={toggleDrawer(side, false)}
      >
        <Title align="center">
            shopping cart
        </Title>
      
      {Object.keys(cartDict).map((key, val)=>(
        <div> {key} : {cartDict[key]} </div>
        ))
      }
      </div>
    );
  
    // const fullList = side => (
    //   <div
    //     className={classes.fullList}
    //     role="presentation"
    //     onClick={toggleDrawer(side, false)}
    //     onKeyDown={toggleDrawer(side, false)}
    //   >
    //     <List>
    //       {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //     <Divider />
    //     <List>
    //       {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //         <ListItem button key={text}>
    //           <ListItemText primary={text} />
    //         </ListItem>
    //       ))}
    //     </List>
    //   </div>
    // );
  
    return (
      <div>
        <Button onClick={toggleDrawer('right', true)}><font size="5" color="red">Open Cart</font></Button>
        <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
          {sideList('right')}
        </Drawer>
        {/* /*
        <Button onClick={toggleDrawer('left', true)}>Open Left</Button>
        
        <Button onClick={toggleDrawer('top', true)}>Open Top</Button>
        <Button onClick={toggleDrawer('bottom', true)}>Open Bottom</Button>
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
        <Drawer anchor="top" open={state.top} onClose={toggleDrawer('top', false)}>
          {fullList('top')}
        </Drawer>
        <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer('bottom', false)}>
          {fullList('bottom')}
        </Drawer>
         */}
        
      </div>
    );
  }