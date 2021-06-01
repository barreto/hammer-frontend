import { Button, Grid, IconButton, Tooltip, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { DeleteForever, NoteAdd } from "@material-ui/icons";
import { GetStaticProps } from "next";
import Head from "next/head";
import Router from "next/router";
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";

import DialogueModel, { DialogueModelProps } from "../../components/DialogueModel";
import GenericBodyPage from "../../components/GenericBodyPage";
import ImagesList from "../../components/ImagesList";
import { HeaderContext } from "../../contexts/HeaderContext";
import { LoadingContext } from "../../contexts/LoadingContext";
import Image from "../../models/Image";
import hammerApi from "../../services/hammerApi";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    headerContainer: {
      marginBottom: "1rem",

      "& h2": {
        paddingRight: "1rem",
      },
    },
    emptyContainer: {
      maxWidth: "240px",
      textAlign: "center",
      height: "70vh",
      margin: "0vh auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    emtpyIcon: {
      fontSize: "200px",
      color: "#777",
    },
    emtpyLabel: {},
  })
);

interface ImagesProps {
  images: Image[];
}

export default function Images({ images }: ImagesProps) {
  const classes = useStyles();

  const { setHeaderStatus } = useContext(HeaderContext);
  const { setLoadingStatus } = useContext(LoadingContext);

  const [dialogState, setDialogState] = React.useState(false);
  const initialDialogProps: DialogueModelProps = {
    title: "Title",
    message: "Message",
    isOpen: dialogState,
    setIsOpen: setDialogState,
  };
  const [dialogProps, setDialogProps] = React.useState(initialDialogProps);

  useEffect(() => {
    setHeaderStatus(true);
    // setLoadingStatus(false);
  }, []);

  const handleCloseDialog = () => {
    setDialogState(false);
  };

  const handleOnDeleteAllClick = () => {
    setDialogProps({
      isOpen: false,
      setIsOpen: setDialogState,
      title: `Permisão para excluir todas as imagens`,
      message: "Tem certeza que deseja apagar todas as imagens listadas?",
      onAgree: () => deteleAllImages(),
      onDisagree: handleCloseDialog,
    });
    setDialogState(true);
    console.log(">>> handleOnDeleteAllClick");
  };

  const deteleAllImages = async () => {
    console.log(">>> deteleAllImages");
    setDialogState(false);
    setLoadingStatus(true);
    try {
      const { data } = await hammerApi.deleteAllImages();
      console.log(">>> Success: ", data);
      Router.reload();
    } catch (error) {
      console.log(">>> Error: ", error);
      setLoadingStatus(false);
    }

    handleCloseDialog();
  };

  const handleOnDeleteSingleClick = (imageId: string, imageName: string) => {
    setDialogProps({
      isOpen: false,
      setIsOpen: setDialogState,
      title: `Permisão para excluir a imagem ${imageName}`,
      message: "Você realmente deseja deletar essa imagem?",
      onAgree: () => deteleImage(imageId),
      onDisagree: handleCloseDialog,
    });
    setDialogState(true);
    console.log(">>> handleOnDeleteSingle: ", imageId);
  };

  const deteleImage = async (imageId: string) => {
    console.log(">>> Delete image: ", imageId);
    setLoadingStatus(true);

    try {
      const { data, status } = await hammerApi.deleteImage(imageId);
      Router.reload();
      console.log(">>> response: ", { data, status });
    } catch (error) {
      console.log(">>> Error: ", error);
    } finally {
      setLoadingStatus(false);
    }

    handleCloseDialog();
  };

  const handleImageCreate = () => {
    Router.push("images/pull");
  };

  const EmptyState = () => {
    return (
      <div className={classes.emptyContainer}>
        <NoteAdd className={classes.emtpyIcon} />
        <Typography>
          Ainda não há imagens baixadas na sua conta. Clique em "pull" para resolver isso!
        </Typography>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Hammer | Images</title>
      </Head>
      <GenericBodyPage>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container direction="row" alignItems="center" className={classes.headerContainer}>
              <h2>Imagens</h2>

              <Tooltip
                title="Excluir todas as imagens"
                aria-label="excluir todas as imagens"
                placement="right"
              >
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  onClick={() => handleOnDeleteAllClick()}
                >
                  <DeleteForever />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item>
            <Tooltip title="Baixe uma imagem" aria-label="baixe uma imagem" placement="right">
              <Button variant="outlined" color="primary" onClick={handleImageCreate}>
                Pull
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        {images.length ? (
          <ImagesList images={images} deleteImage={handleOnDeleteSingleClick} />
        ) : (
          <EmptyState />
        )}
      </GenericBodyPage>
      <DialogueModel
        isOpen={dialogState}
        setIsOpen={dialogProps.setIsOpen}
        title={dialogProps.title}
        message={dialogProps.message}
        agreeLabel={dialogProps.agreeLabel}
        onAgree={dialogProps.onAgree}
        disagreeLabel={dialogProps.disagreeLabel}
        onDisagree={dialogProps.onDisagree}
      />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await hammerApi.getImages();

  const images = data.images.map((image: any) => {
    const [name, tag] = image.repoTags[0].split(":");

    const maxLength = image.repoTags.length > 2 ? image.repoTags.length : 2;
    const pulledVersions = String(image.repoTags.length).padStart(maxLength, "0");

    // converting to megabyte values
    const size = (image.size / 1000000).toFixed(2);
    const virtualSize = (image.virtualSize / 1000000).toFixed(2);

    return { ...image, name, tag, pulledVersions, size, virtualSize };
  });

  images.sort(function (a: any, b: any) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return {
    props: { images },
    revalidate: 5,
  };
};
