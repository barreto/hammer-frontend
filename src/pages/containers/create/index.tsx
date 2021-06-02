import { Button, Grid, Tooltip } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    formControl: {
      // margin: theme.spacing(1),
      textTransform: "capitalize",
      width: "100%",
    },
    formControlItem: {
      textTransform: "capitalize",
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

export default function CreateContainer() {
  const classes = useStyles();
  const { setLoadingStatus } = useContext(LoadingContext);

  const [containerName, setContainerName] = useState("");
  const [isContainerNameTipOpen, setIsContainerNameTipOpen] = useState(false);
  const [imageName, setImageName] = useState("");
  const [tag, setTag] = useState("");
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    setLoadingStatus(false);
    const { data } = await hammerApi.getImages();

    const imagesNamesAndTags = data.images.map((image: any) => {
      const [name, tag] = image.repoTags[0].split(":");
      return { name, tag };
    });

    imagesNamesAndTags.sort(function (a: any, b: any) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    let unicImageNames: any[] = [];
    for (const nameTagItem of imagesNamesAndTags) {
      const isNewImageName = !unicImageNames.includes(nameTagItem.name);
      if (isNewImageName) unicImageNames.push(nameTagItem.name);
    }

    let images: any = {};

    unicImageNames.forEach((name) => {
      const tagsOfName = imagesNamesAndTags
        .filter((nameTagItem: any) => nameTagItem.name == name)
        .map((item: any) => item.tag);
      images = { ...images, [name]: tagsOfName };
    });

    setImages(images);
    setLoadingStatus(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const isValidInfo = () => {
    return containerName.length > 0 && imageName.length > 0 && tag.length > 0;
  };

  const handleContainerBackClick = () => {
    setLoadingStatus(true);
    Router.push("/containers");
  };

  const handleCreateClick = async () => {
    setLoadingStatus(true);
    try {
      const { data } = await hammerApi.createContainer(containerName, imageName, tag);
      console.log(">>> Success: ", data);
      handleContainerBackClick();
      setLoadingStatus(false);
    } catch (error) {
      console.log(">>> Error: ", error);
      alert("Falha ao baixar imagem");
      setLoadingStatus(false);
    }
  };

  const handleContainerNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;

    const blockedValues = [" ", "!", "@", "#", "$", "%", "¨", "&", "*", "(", ")", "+"];
    const hasBlockedValues = blockedValues.includes(value);

    const regexName = /^[\w\-]/;
    const regexSpecialChar = /[*|\":<>[\]{}`\\()';!@&$%]/;

    const hasAlphanumericAndTrace = regexName.test(value);
    const hasSpecialChars = regexSpecialChar.test(value);
    const hasWhiteSpace = value.includes(" ");

    const isValid =
      hasAlphanumericAndTrace && !hasBlockedValues && !hasSpecialChars && !hasWhiteSpace;

    if (true) {
      setContainerName(value);
    } else {
      setIsContainerNameTipOpen(true);
      const showContainerTip = () => setIsContainerNameTipOpen(false);
      setTimeout(showContainerTip, 3000);
    }
  };

  const handleImageNameChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setImageName(event.target.value as string);
  };

  const handleTagChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTag(event.target.value as string);
  };

  const [allTags, setAllTags] = useState<any[]>([]);
  useEffect(() => {
    for (const [itemkey, itemValue] of Object.entries(images)) {
      if (itemkey == imageName) {
        setAllTags(itemValue);
        return;
      }
    }
  }, [imageName]);

  return (
    <>
      <Head>
        <title>Hammer | Create container</title>
      </Head>
      <GenericBodyPage>
        <h2>Criação de contêiner</h2>

        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Tooltip
                interactive
                placement="top"
                open={isContainerNameTipOpen}
                title="Além de traço('-'), apenas caracteres alfanuméricos são permitidos"
              >
                <TextField
                  id="outlined-basic"
                  label="Nome do container"
                  variant="outlined"
                  className={classes.input}
                  value={containerName}
                  onChange={handleContainerNameChange}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={8}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="image-name-lable">Imagem</InputLabel>
                <Select
                  labelId="image-name-lable"
                  id="image-name-select"
                  value={imageName}
                  onChange={handleImageNameChange}
                  label="Imagens"
                >
                  <MenuItem value="" disabled={true}>
                    Selecione
                  </MenuItem>
                  {Object.keys(images).map((imageName, idx) => (
                    <MenuItem
                      key={`${imageName}-${idx}`}
                      value={imageName}
                      className={classes.formControlItem}
                    >
                      {imageName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="tag-select-lable">Tag</InputLabel>
                <Select
                  labelId="tag-select-lable"
                  id="tag-select"
                  value={tag}
                  onChange={handleTagChange}
                  label="Tag"
                >
                  <MenuItem value="" disabled={true}>
                    Selecione
                  </MenuItem>
                  {imageName &&
                    allTags.map((tag: any, idx: number) => (
                      <MenuItem
                        key={`${tag}-${idx}`}
                        value={tag}
                        className={classes.formControlItem}
                      >
                        {tag}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row-reverse"
            justify="space-between"
            className={classes.buttonGroup}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateClick}
              disabled={!isValidInfo()}
            >
              Criar
            </Button>
            <Button variant="outlined" color="primary" onClick={handleContainerBackClick}>
              Voltar
            </Button>
          </Grid>
        </div>
      </GenericBodyPage>
    </>
  );
}
