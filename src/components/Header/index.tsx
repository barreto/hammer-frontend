import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useContext } from 'react';

import { HeaderContext } from '../../contexts/HeaderContext';
import theme from '../../theme';
import Logo from '../Logo';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      transition: "200ms",

      "&:hover": {
        background: "linear-gradient(45deg, #6D34B6, #0DAFD3)",
      },
    },
    logo: {
      flexGrow: 1,
    },
    date: {
      textTransform: "capitalize",
    },
  })
);
export default function Header() {
  const { headerStatus } = useContext(HeaderContext);
  const currentDate = format(new Date(), "EEEEEE, d MMM yyyy", { locale: ptBR });

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {headerStatus && (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>

            <div className={classes.logo}>
              <Logo />
            </div>

            <Typography variant="h6" className={classes.date}>
              {currentDate}
            </Typography>

            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}
