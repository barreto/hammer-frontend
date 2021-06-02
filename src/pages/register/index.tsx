import { Button, createStyles, Grid, Link, makeStyles, TextField, Theme } from '@material-ui/core';
import Head from 'next/head';
import Router from 'next/router';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import Logo from '../../components/Logo';
import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import style from './styles.module.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "1rem",
    },
    linkContainer: {
      display: "flex",
      flexDirection: "row-reverse",
      color: theme.palette.secondary.main,
      margin: "-10px 0",

      "& a": {
        cursor: "pointer",
        width: "max-content",
      },
    },
  })
);

export default function Login() {
  const classes = useStyles();
  const { setLoadingStatus } = useContext(LoadingContext);
  const { setHeaderStatus } = useContext(HeaderContext);

  const [hasValidFields, setHasValidFields] = useState(false);
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setHeaderStatus(false);
    setLoadingStatus(false);
  }, []);

  useEffect(() => {
    const isValid = Boolean(
      Boolean(username) &&
        Boolean(username.trim()) &&
        Boolean(nickname) &&
        Boolean(nickname.trim()) &&
        Boolean(email) &&
        Boolean(email.trim()) &&
        Boolean(password) &&
        Boolean(password.trim()) &&
        Boolean(password.length >= 8)
    );

    setHasValidFields(isValid);
  }, [username, password]);

  const handleLoginNavigation = () => {
    setLoadingStatus(true);
    Router.push("/login");
  };

  const handleLoginSubmit = () => {
    setLoadingStatus(true);
    console.log(">>> loading status: ", true);

    const possiblePasswords = ["adminadmin", "administracaoadministrativadeadmin"];

    setTimeout(() => {
      if (username == "admin" && possiblePasswords.includes(password)) {
        console.log(">>> login: ", { username, password });
        Router.push("/home");
      } else {
        setLoadingStatus(false);
        console.log(">>> loading status: ", false);
      }
    }, 1000);
  };

  return (
    <div>
      <Head>
        <title>Hammer | Login</title>
      </Head>
      <div className={style.loginContainer}>
        <div className={style.loginForm}>
          <header>
            <Grid container justify="center" alignItems="center" spacing={1}>
              <Grid item>
                <Logo />
              </Grid>
              <Grid item>
                <p>| Sign In</p>
              </Grid>
            </Grid>
          </header>
          <main>
            <form onSubmit={handleLoginSubmit} method="post">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="nickname-input"
                    label="apelido"
                    variant="outlined"
                    value={nickname}
                    onChange={(event) => setNickname(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username-input"
                    label="usuário"
                    variant="outlined"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username-input"
                    type="email"
                    label="email"
                    variant="outlined"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password-input"
                    label="senha"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Grid>

                <Grid item xs={12} className={classes.linkContainer}>
                  <Link onClick={handleLoginNavigation}>já tenho conta</Link>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLoginSubmit}
                    disabled={!hasValidFields}
                  >
                    Criar conta
                  </Button>
                </Grid>
              </Grid>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
