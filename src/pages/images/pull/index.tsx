import { Button, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Head from 'next/head';
import Router from 'next/router';
import React, { useContext, useEffect, useState } from 'react';

import GenericBodyPage from '../../../components/GenericBodyPage';
import { LoadingContext } from '../../../contexts/LoadingContext';
import hammerApi from '../../../services/hammerApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: "1rem",
    },
    input: {
      width: "100%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    buttonGroup: {
      paddingTop: "1rem",
    },
  })
);
export default function PullImage() {
  const classes = useStyles();
  const { setLoadingStatus } = useContext(LoadingContext);
  const [name, setName] = useState("");
  const [tag, setTag] = useState("");

  const isValidInfo = () => {
    return name.length > 0 && tag.length > 0;
  };

  const handImageBackClick = () => {
    setLoadingStatus(true);
    Router.push("/images");
  };

  const handlePullClick = async () => {
    setLoadingStatus(true);
    try {
      const { data } = await hammerApi.pullImage(name, tag);
      console.log(">>> Success: ", data);
      handImageBackClick();
    } catch (error) {
      console.log(">>> Error: ", error);
      alert("Falha ao baixar imagem");
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    setLoadingStatus(false);
  }, []);

  return (
    <>
      <Head>
        <title>Hammer | Pull Images</title>
      </Head>
      <GenericBodyPage>
        <h2>Pull image</h2>

        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="name"
                variant="outlined"
                className={classes.input}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label="tag"
                variant="outlined"
                className={classes.input}
                value={tag}
                onChange={(event) => setTag(event.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={classes.buttonGroup}>
            <Button variant="outlined" color="primary" onClick={handImageBackClick}>
              Voltar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handlePullClick}
              disabled={!isValidInfo()}
            >
              Pull
            </Button>
          </Grid>
        </div>
      </GenericBodyPage>
    </>
  );
}
