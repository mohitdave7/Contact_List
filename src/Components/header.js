import React from "react";
import { makeStyles, createStyles, fade } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflow: "hidden",
      padding: theme.spacing(0, 3),
      "& > *": {
        marginTop: theme.spacing(2),
      },
      "& > svg": {
        margin: theme.spacing(2),
      },
    },
    paper: {
      maxWidth: 430,
      margin: `${theme.spacing(1)}px auto`,
      backgroundColor: fade(theme.palette.common.white, 0.15),

      //   padding: theme.spacing(2),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      width: "100%",
    },
  })
);

export const Header = (props) => {
  const classes = useStyles();
  let history = useHistory();

  let { contact_list } = useSelector((state) => state);
  const dispatch = useDispatch();

  const sortAscending = () => {
    contact_list.data.sort((a, b) => (a.first_name > b.first_name ? 1 : -1));
    dispatch({ type: "SET_CONTACT", payload: contact_list });
  };

  

  const sortDescending = () => {
    contact_list.data.sort((a, b) => (a.first_name < b.first_name ? 1 : -1));
    dispatch({ type: "SET_CONTACT", payload: contact_list });
  };


  const gotofav = () => {
    history.replace("/favourites");
  };



  const gotohome = () => {
    history.replace("/home");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.paper}>
        <Toolbar>
          <HomeIcon onClick={gotohome} />

          {!props.detailpage ? (
            <>
              <IconButton onClick={sortAscending}>
                {" "}
                <i className="fa fa-sort-asc"></i>
              </IconButton>
              <IconButton onClick={sortDescending}>
                {" "}
                <i className="fa fa-sort-desc"></i>
              </IconButton>

              <Typography
                className={classes.title}
                variant="h6"
                noWrap
              ></Typography>
              <IconButton onClick={gotofav}>Fav</IconButton>

              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
};
