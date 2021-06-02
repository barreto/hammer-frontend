import { IconButton, Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AllInbox, InsertDriveFile } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import clsx from 'clsx';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import Router from 'next/router';
import { ReactNode } from 'react';
import React, { useContext } from 'react';

import drawerWidth from '../../constants/drawerWidth';
import { LoadingContext } from '../../contexts/LoadingContext';
import theme from '../../theme';

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
      marginRight: 36,
    },
    date: {
      textTransform: "capitalize",
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

interface SideBarProps {
  isOpen: boolean;
  handleDrawerClose: () => void;
  children?: ReactNode;
}

export default function SideBar({ isOpen, handleDrawerClose }: SideBarProps) {
  const classes = useStyles();
  const { setLoadingStatus } = useContext(LoadingContext);
  const currentDate = format(new Date(), "EEEEEE, d MMM yyyy", { locale: ptBR });

  const sideBarItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      pagePath: "dashboard",
    },
    {
      text: "Images",
      icon: <InsertDriveFile />,
      pagePath: "images",
    },
    {
      text: "Containers",
      icon: <AllInbox />,
      pagePath: "containers",
    },
  ];

  const handleRedirectionClick = (path: string) => {
    setLoadingStatus(true);
    Router.push(`/${path}`);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isOpen,
        [classes.drawerClose]: !isOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <Typography variant="h6" className={classes.date}>
          {currentDate}
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />
      <List>
        {sideBarItems.map((item, key) => (
          <ListItem
            button
            key={`${key}-${item.text}`}
            onClick={() => handleRedirectionClick(item.pagePath)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
