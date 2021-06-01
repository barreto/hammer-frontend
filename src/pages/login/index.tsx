import Head from 'next/head';
import Router from 'next/router';
import { SyntheticEvent, useContext, useEffect, useState } from 'react';

import Logo from '../../components/Logo';
import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import style from './styles.module.scss';

export default function Login() {
  const { setLoadingStatus } = useContext(LoadingContext);
  const { setHeaderStatus } = useContext(HeaderContext);

  const [hasValidFields, setHasValidFields] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setHeaderStatus(false);
    setLoadingStatus(false);
  }, []);

  useEffect(() => {
    const isValid = Boolean(
      Boolean(username) &&
        Boolean(username.trim()) &&
        Boolean(password) &&
        Boolean(password.trim()) &&
        Boolean(password.length >= 8)
    );

    setHasValidFields(isValid);
  }, [username, password]);

  function handleLoginSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
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
  }

  return (
    <div>
      <Head>
        <title>Hammer | Login</title>
      </Head>
      <div className={style.loginContainer}>
        <div className={style.loginForm}>
          <header>
            <Logo />
          </header>
          <main>
            <form onSubmit={handleLoginSubmit} method="post">
              <label htmlFor="username-input">Username</label>
              <input
                id="username-input"
                name="username"
                type="text"
                autoComplete="off"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                name="password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button type="submit" disabled={!hasValidFields}>
                Entrar
              </button>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}
