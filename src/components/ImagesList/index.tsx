import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { ReactNode, SyntheticEvent, useContext, useEffect, useState } from 'react';

import Image from '../../models/Image';
import ImageItem from '../ImageItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
    },
    tag: {
      color: "#444",
    },
  })
);

interface ImageItemsProps {
  images: Image[];
  deleteImage: (imageId: string, imageName: string) => void;
}

export default function ImagesList({ images, deleteImage }: ImageItemsProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container>
        {images.map((image) => (
          <ImageItem key={image.id} image={image} deleteImage={deleteImage} />
        ))}
      </Grid>
    </div>
  );
}
