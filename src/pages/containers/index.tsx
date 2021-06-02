import { Button, Grid, IconButton, Tooltip, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { DeleteForever, Inbox, Refresh } from '@material-ui/icons';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Router from 'next/router';
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';

import ContainersList from '../../components/ContainersList';
import DialogueModel, { DialogueModelProps } from '../../components/DialogueModel';
import GenericBodyPage from '../../components/GenericBodyPage';
import { HeaderContext } from '../../contexts/HeaderContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import hammerApi from '../../services/hammerApi';

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
  containers: any[];
}

export default function Containers({ containers }: ImagesProps) {
  const classes = useStyles();
  const hasContainers = Boolean(containers.length);

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
  const handleUpdate = () => {
    Router.reload();
  };

  const handleOnDeleteAllClick = () => {
    setDialogProps({
      isOpen: false,
      setIsOpen: setDialogState,
      title: `Permisão para excluir todos os contêineres`,
      message: "Tem certeza que deseja apagar todos os contêineres listados?",
      onAgree: () => deteleAllContainers(),
      onDisagree: handleCloseDialog,
    });
    setDialogState(true);
    console.log(">>> handleOnDeleteAllClick");
  };

  const deteleAllContainers = async () => {
    console.log(">>> deteleAllContainers");
    handleCloseDialog();

    setLoadingStatus(true);
    try {
      const { data, status } = await hammerApi.deleteAllContainers();
      console.log(">>> Success: ", { data, status });
      handleUpdate();
    } catch (error) {
      console.log(">>> Error: ", error);
      alert("Falha ao excluir todos os contêineres.");
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleOnDeleteSingleClick = (imageId: string, imageName: string) => {
    setDialogProps({
      isOpen: false,
      setIsOpen: setDialogState,
      title: "Permisão para excluir contêiner",
      message: `Você realmente deseja apagar permanentemente o contêiner ${imageName}?`,
      onAgree: () => deteleContainer(imageId),
      onDisagree: handleCloseDialog,
    });
    setDialogState(true);
    console.log(">>> handleOnDeleteSingle: ", imageId);
  };

  const deteleContainer = async (containerId: string) => {
    console.log(">>> Delete: ", containerId);
    setLoadingStatus(true);

    try {
      const { data, status } = await hammerApi.deleteContainer(containerId);
      handleUpdate();
      console.log(">>> response: ", { data, status });
    } catch (error) {
      console.log(">>> Error: ", error);
      alert("Falha ao excluir container.");
    } finally {
      setLoadingStatus(false);
    }

    handleCloseDialog();
  };

  const handleContainerCreate = () => {
    setLoadingStatus(true);
    Router.push("containers/create");
  };

  const EmptyState = () => {
    return (
      <div className={classes.emptyContainer}>
        <Inbox className={classes.emtpyIcon} />
        <Typography>
          Ainda não há contêineres na sua conta. Clique em "criar" para resolver isso!
        </Typography>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Hammer | Contêineres</title>
      </Head>
      <GenericBodyPage>
        <Grid container justify="space-between">
          <Grid item>
            <Grid container direction="row" alignItems="center" className={classes.headerContainer}>
              <h2>Contêineres</h2>

              {hasContainers && (
                <Tooltip
                  title="Excluir todos os contêirneres"
                  aria-label="excluir todos os contêirneres"
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
              )}
            </Grid>
          </Grid>
          <Grid item>
            {hasContainers && (
              <Tooltip title="Atualizar" aria-label="atualizar" placement="left">
                <IconButton
                  color="inherit"
                  aria-haspopup="true"
                  aria-controls="menu-appbar"
                  onClick={handleUpdate}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Crie um contêiner" aria-label="Crie um contêiner" placement="left">
              <Button variant="outlined" color="primary" onClick={handleContainerCreate}>
                Criar
              </Button>
            </Tooltip>
          </Grid>
        </Grid>

        {hasContainers ? (
          <ContainersList containers={containers} deleteContainer={handleOnDeleteSingleClick} />
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
  async function createImages() {
    const { data } = await hammerApi.getImages();

    const images = data.images.map((image: any) => {
      const [name, tag] = image.repoTags[0].split(":");

      return { name, tag };
    });

    images.sort(function (a: any, b: any) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    return images;
  }

  async function createContainers() {
    const { data } = await hammerApi.getContainers();

    const containers = data.containers.map((container: any) => {
      const [image, tag = "unknow"] = container.image.split(":");
      const networkMode = container?.hostConfig?.NetworkMode;
      const { id, command, status } = container;

      return { id, tag, image, networkMode, command, status };
    });

    return containers;
  }

  const props = { containers: await createContainers() };

  return { props, revalidate: 5 };
};
