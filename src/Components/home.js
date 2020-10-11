import React, { useState, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
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
  const [data, setData] = useState("");
  const [page, setPage] = useState(1);

  let { contact_list } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      fetch(`https://reqres.in/api/users?page=${page}`)
        .then((response) => response.json())
        .then((res) => {
          setData(res);
          dispatch({ type: "SET_CONTACT", payload: res });
        })
        .catch((err) => console.log(err));
    }
    fetchData();
  }, []);

  const handleChange = (event, value) => {
    fetch(`https://reqres.in/api/users?page=${value}`)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        dispatch({ type: "SET_CONTACT", payload: res });
        console.log(data);
      })
      .catch((err) => console.log(err));
    setPage(value);
  };
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header detailpage={false}/>
      <Contact data={contact_list && contact_list.data} fromfav={false} />
      <Grid item xs={12} sm container>
        <Pagination
          className={classes.paper}
          count={data.total_pages}
          page={page}
          onChange={handleChange}
        />
      </Grid>
    </div>
  );
}
