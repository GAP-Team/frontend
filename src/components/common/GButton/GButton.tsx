import React from "react";
import Link from "next/link";
import { Button } from "flowbite-react"
import style from "./GButton.module.scss";
import cx from "classnames";

const GButton = () => {
  return (
    <Link className={cx(style.gButtonContainer)} href="#">
      <Button className={cx(style.gbutton)}>hier ist developer branch</Button>
    </Link>
  );
};

export default GButton;
