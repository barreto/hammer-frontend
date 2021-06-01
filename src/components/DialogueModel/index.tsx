import { Slide } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TransitionProps } from '@material-ui/core/transitions';
import { ReactNode, SyntheticEvent, useContext, useEffect, useState } from 'react';
import React from 'react';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface DialogueModelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  message: string;
  agreeLabel?: string;
  onAgree?: () => void;
  disagreeLabel?: string;
  onDisagree?: () => void;
}
export default function DialogueModel(props: DialogueModelProps) {
  const handleCloseDialog = () => {
    props.setIsOpen(false);
  };

  return (
    <Dialog
      open={props.isOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onDisagree} color="primary">
          {props.disagreeLabel || "Não"}
        </Button>
        <Button onClick={props.onAgree} color="primary">
          {props.agreeLabel || "Sim"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
