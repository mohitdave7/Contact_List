import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Header } from "./header";
import "./home.css";
import Contact from "./Contact";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  })
);

export default function Home() {

  let contact=localStorage.getItem("Fav_data")

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <Contact data={contact && contact} fromfav={true}  />
    </div>
  );
}
