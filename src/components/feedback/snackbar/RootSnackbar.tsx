"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { hidesnackbar } from "@/lib/features/snackbarSlice";
import { AlertTitle } from "@mui/material";

export const RootSnackbar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { message, title, type, persistent, vertical, horizontal } =
    useAppSelector((state) => state.snackbar);

  let open = true;

  const handleOnClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ): void => {
    if (persistent && reason === "clickaway") {
      return;
    }
    dispatch(hidesnackbar());
  };

  if (type === undefined) open = false;

  return (
    <Snackbar
      open={open}
      autoHideDuration={persistent ? null : 6000}
      onClose={handleOnClose}
      anchorOrigin={{
        vertical: vertical || "bottom",
        horizontal: horizontal || "center",
      }}
    >
      <Alert
        onClose={handleOnClose}
        elevation={6}
        variant="filled"
        severity={type}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};
export default RootSnackbar;
