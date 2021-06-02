import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { ReactNode, SyntheticEvent, useContext, useEffect, useState } from 'react';

import Container from '../../models/Container';
import ContainerItem from '../ContainerItem';

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

interface ContainersListProps {
  containers: Container[];
  deleteContainer: (containerId: string, containerName: string) => void;
}

export default function ContainersList({ containers, deleteContainer }: ContainersListProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {containers.map((container) => (
          <ContainerItem
            key={container.id}
            container={container}
            deleteContainer={deleteContainer}
          />
        ))}
      </Grid>
    </div>
  );
}
