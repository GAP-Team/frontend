"use client";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import React, { ReactElement } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { hidesnackbar } from "@/lib/features/snackbarSlice";

export const RootSnackbar = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { message, type } = useAppSelector((state) => state.snackbar);

  let open = true;
  const handleOnClose = (): void => {
    dispatch(hidesnackbar());
  };

  if (type === undefined) open = false;

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleOnClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleOnClose}
        elevation={6}
        variant="filled"
        severity={type}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
export default RootSnackbar;
