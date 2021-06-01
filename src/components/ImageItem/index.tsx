import {
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
} from "@material-ui/core";
import { Delete, ImageSearch } from "@material-ui/icons";
import React, { ReactNode, SyntheticEvent, useContext, useEffect, useState } from "react";

import Image from "../../models/Image";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      background: "#e7e7e7",
    },
    name: {
      color: "#333",
      textTransform: "capitalize",
      fontSize: "1.5rem",
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
      fontSize: ".8rem",
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

interface ImageItemsProps {
  image: Image;
  deleteImage: (imageId: string, imageName: string) => void;
}

export default function ImageItem({ image, deleteImage }: ImageItemsProps) {
  const delay = 1 * 1000; // sec * milisseconds
  const classes = useStyles();
  const [hasWaitedDeplay, sethasWaitedDeplay] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      sethasWaitedDeplay(true);
    }, delay);
  }, []);

  const handleInspect = (idToInspect: string) => {
    console.log(">>> inspect: ", idToInspect);
  };

  const handleDelete = (idToDelete: string, nameToDelete: string) => {
    deleteImage(idToDelete, nameToDelete);
  };

  return (
    <Grid item xs={12}>
      <Fade in={hasWaitedDeplay}>
        <Paper className={classes.paper}>
          <Grid container direction="row" alignItems="center" justify="space-between">
            <Grid item>
              <Typography>
                <span className={classes.name}>{image.name}</span>
                <span className={classes.tag}>{image.tag}</span>
              </Typography>
            </Grid>
            <Grid item className={classes.itemOptions}>
              {/* <Tooltip title="Inspecionar imagem" aria-label="inspecionar imagem" placement="top">
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  aria-label="account of current user"
                  onClick={() => handleInspect(image.id)}
                >
                  <ImageSearch />
                </IconButton>
              </Tooltip> */}
              <Tooltip title="Excluir imagem" aria-label="excluir imagem" placement="top">
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  aria-label="account of current user"
                  onClick={() => handleDelete(image.id, image.name)}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justify="space-around">
            {/* <Grid item>
              <Typography className={classes.name}>{image.pulledVersions}</Typography>
              <Typography className={classes.label}>
                marcas
                <br />
                (tags)
              </Typography>
            </Grid> */}
            <Grid item>
              <Typography className={classes.name}>
                {image.containers < 0 ? "N/A" : image.containers}
              </Typography>
              <Typography className={classes.label}>
                containers
                <br />
                ativos
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.name}>
                {image.size}
                <span className={classes.nameComplement}>MB</span>
              </Typography>
              <Typography className={classes.label}>
                tamanho
                <br />
                real
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.name}>
                {image.virtualSize}
                <span className={classes.nameComplement}>MB</span>
              </Typography>
              <Typography className={classes.label}>
                tamanho
                <br />
                virtual
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </Grid>
  );
}
