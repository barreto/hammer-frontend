import { AppBar, Grid, IconButton, Toolbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { ReactElement, ReactNode, useContext, useRef } from 'react';

import drawerWidth from '../../constants/drawerWidth';
import { HeaderContext } from '../../contexts/HeaderContext';
import theme from '../../theme';
import Logo from '../Logo';
import SideBar from '../SideBar';
import TogglableMenu from '../TogglableMenu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
      transition: "200ms",

      "&:hover": {
        background: "linear-gradient(45deg, #6D34B6, #0DAFD3)",
      },
    },
    hide: {
      display: "none",
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    logo: {
      flex: 1,
      transition: "200ms",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      marginRight: theme.spacing(2),
    },
  })
);

function Header() {
  const { headerStatus } = useContext(HeaderContext);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const openAnchor = Boolean(anchorEl);

  // const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    headerStatus && (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Grid container justify="center" alignItems="center">
              <Logo />
            </Grid>
            <TogglableMenu />
          </Toolbar>
        </AppBar>
        <SideBar isOpen={open} handleDrawerClose={handleDrawerClose} />
        <div className={classes.toolbar} />
      </div>
    )
  );
}
export default Header;
