import {
  Chip,
  createStyles,
  Divider,
  Fade,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PanToolIcon from '@material-ui/icons/PanTool';
import ReplayIcon from '@material-ui/icons/Replay';
import Router from 'next/router';
import React, { ReactNode, SyntheticEvent, useContext, useEffect, useState } from 'react';

import { LoadingContext } from '../../contexts/LoadingContext';
import Container from '../../models/Container';
import hammerApi from '../../services/hammerApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      background: "#e7e7e7",
    },
    containerHeader: {
      margin: "0 0 .25rem ",
    },
    containerContent: {
      margin: "0 0 .5rem ",
    },
    containerFooter: {
      margin: ".5rem 0 0",
    },
    containerName: {
      color: "#333",
      textTransform: "capitalize",
      fontSize: "1.5rem",
    },
    name: {
      color: "#333",
      textTransform: "capitalize",
      fontSize: "1rem",
      margin: "1rem 0 0",
    },
    nameComplement: {
      color: "#777",
      textTransform: "capitalize",
      fontSize: "1.25rem",
    },
    tag: {
      color: "#888",
      fontSize: "1.5rem",
      paddingLeft: ".5rem",
    },
    label: {
      color: "#888",
      fontSize: "1rem",
    },
    paper: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      transition: "boxShadow 1s",
    },
    itemOptions: {
      margin: "auto 0",
    },
  })
);

interface ContainerItemsProps {
  container: Container;
  deleteContainer: (imageId: string, imageName: string) => void;
}

export default function ContainerItem({ container, deleteContainer }: ContainerItemsProps) {
  const delay = 1 * 1000; // sec * milisseconds
  const classes = useStyles();
  const { setLoadingStatus } = useContext(LoadingContext);
  const [hasWaitedDeplay, sethasWaitedDeplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      sethasWaitedDeplay(true);
    }, delay);
  }, []);

  const handleRun = async (containerId: string) => {
    console.log(">>> handleRun");

    setLoadingStatus(true);
    try {
      const { data, status } = await hammerApi.startContainer(containerId);
      console.log(">>> Success: ", { data, status });
      Router.reload();
      setLoadingStatus(false);
    } catch (error) {
      console.log(">>> Error: ", error);
      alert("Falha ao executar contêiner.");
    }
  };

  const handleRestart = async (containerId: string) => {
    console.log(">>> handleStop");

    setLoadingStatus(true);
    try {
      const { data, status } = await hammerApi.restartContainer(containerId);
      console.log(">>> Success: ", { data, status });
      Router.reload();
      setLoadingStatus(false);
    } catch (error) {
      console.log(">>> Error: ", error);
      alert("Falha ao reiniciar contêiner.");
    }
  };

  const handleStop = async (containerId: string) => {
    console.log(">>> handleStop");

    setLoadingStatus(true);
    try {
      const { data, status } = await hammerApi.stopContainer(containerId);
      console.log(">>> Success: ", { data, status });
      Router.reload();
      setLoadingStatus(false);
    } catch (error) {
      console.log(">>> Error: ", error);
      alert("Falha ao parar contêiner.");
    }
  };

  const handleDelete = (idToDelete: string, nameToDelete: string) => {
    deleteContainer(idToDelete, nameToDelete);
  };

  return (
    <Grid item xs={12} md={6}>
      <Fade in={hasWaitedDeplay}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            className={classes.containerHeader}
          >
            <Grid item>
              <Typography className={classes.containerName}>{container.image}</Typography>
            </Grid>
            <Grid item>
              <Chip color="primary" label={container.command} />
            </Grid>
          </Grid>
          <Divider />

          <Divider />
          <Grid
            container
            direction="row"
            justify="space-around"
            className={classes.containerContent}
          >
            <Grid item className={classes.itemOptions}>
              <Typography className={classes.name}>{container.tag}</Typography>
              <Typography className={classes.label}>tag</Typography>
            </Grid>
            <Grid item className={classes.itemOptions}>
              <Typography className={classes.name}>{container.status}</Typography>
              <Typography className={classes.label}>status</Typography>
            </Grid>
            <Grid item className={classes.itemOptions}>
              <Typography className={classes.name}>{container.networkMode}</Typography>
              <Typography className={classes.label}>network </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
            className={classes.containerFooter}
          >
            <Grid item className={classes.itemOptions}>
              <Tooltip
                placement="top"
                title="run: rodar contêiner"
                aria-label="run: rodar contêiner"
              >
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  onClick={() => handleRun(container.id)}
                >
                  <DirectionsRunIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item className={classes.itemOptions}>
              <Tooltip
                placement="top"
                title="stop: parar contêiner"
                aria-label="stop: parar contêiner"
              >
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  onClick={() => handleStop(container.id)}
                >
                  <PanToolIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item className={classes.itemOptions}>
              <Tooltip
                placement="top"
                title="restart: reiniciar contêiner"
                aria-label="restart: reiniciar contêiner"
              >
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  onClick={() => handleRestart(container.id)}
                >
                  <ReplayIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item className={classes.itemOptions}>
              <Tooltip
                placement="top"
                title="remove: excluir contêiner"
                aria-label="remove: excluir contêiner"
              >
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  onClick={() => handleDelete(container.id, container.image)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Grid>
  );
}
