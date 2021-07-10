import React, {useContext, useEffect } from 'react';
import { UserContext } from '../utils/UserContext';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import BrowseIcon from '@material-ui/icons/FindInPage';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import BuildIcon from '@material-ui/icons/Build';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect, Link } from 'react-router-dom';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    useEffect(() => {
        console.log('Value: ', userInfo)
    }, [userInfo])

//ADD STUFF
const getIcon = (page) => {
    // switch if page === work return icon
    switch (page) {
    case 'Home Page':
        return <HomeIcon/>
        // break;
    case 'Admin Tasks':
        return <BuildIcon/>
        // break;
    case 'Book':
        return <MailIcon/>
        // break;
    case 'Browse Tours':
        return <BrowseIcon/>
        // break;
    case 'Login':
        return <MailIcon/>
        // break;
    case 'My Stuff':
        return <EmojiPeopleIcon/>
        // break;
    case 'Operator':
        return <MailIcon/>
        // break;
    case 'Tour':
        return <MailIcon/>
        // break;
    case 'All Tours':
        return <DynamicFeedIcon/>
        // break;
    case 'Log In / Sign Up':
        return <HowToRegIcon/>
        // break;
    case 'Log Out':
        return <ExitToAppIcon/>
        // break;
    default: 
        return <MailIcon/>
    }
  }

const history = useHistory();

  const setPage = (page) => {
      console.log("I'm in setPage",page);
      console.log('userinfo: ',userInfo)
    //   history.push("/about");
      history.push(`/${page}`);
      return
  }

  const nliPages = [{'text':'Home Page','menuPath':'home'},{'text':'Browse Tours','menuPath':'browse'},{'text':'Log In / Sign Up','menuPath':'login'}];

  const userPages = [{'text':'Home Page','menuPath':'home'},{'text':'Browse Tours','menuPath':'browse'},{'text':'My Stuff','menuPath':'mystuff'},{'text':'Log Out','menuPath':'login'}];
  
  const adminPages = [{'text':'Home Page','menuPath':'home'},{'text':'Browse Tours','menuPath':'browse'}, {'text':'Admin Tasks','menuPath':'admin'}, {'text':'All Tours','menuPath':'touradmin'}, {'text':'Operator Admin','menuPath':'operator'}, {'text':'Tour Page TEMP','menuPath':'tour'},{'text':'Log Out','menuPath':'login'}];
  
  if(userInfo === "ADMIN") {
      var Pages = adminPages
  } else if(userInfo === "USER") {
      Pages = userPages
  } else Pages = nliPages;

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          {Pages.map(({text, menuPath}, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{getIcon(text)}</ListItemIcon>
              <ListItemText primary={text}
              onClick={() => {
                setPage(menuPath);
            }
            } />
            </ListItem>
          ))}
        </List>
    </div>
  );

  return (
    <div>
      {/* {['left', 'right', 'top', 'bottom'].map((anchor) => ( */}
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><MenuIcon /></Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}