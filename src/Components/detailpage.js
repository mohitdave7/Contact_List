import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import { Header } from "./header";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(0, 3),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));

export default function DetailPage(props) {
  const [open, setOpen] = React.useState(false);

  let id = props.match.params.id.split(":")[1];
  const classes = useStyles();
  const dispatch = useDispatch();
  let { contact, favourites } = useSelector((state) => state);

  useEffect(() => {
    fetch(`https://reqres.in/api/users/${id}`)
      .then((response) => response.json())
      .then((res) => {
        dispatch({ type: "SET_SINGLEDATA", payload: res });
      })
      .catch((err) => console.log(err));
  }, []);



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  const addTOFavorites = (item) => {
      let updated_data=[...favourites, item]
      
    dispatch({ type: "SET_FAVDATA", payload:  updated_data});
    const filteredArray = updated_data.filter((item, index) => updated_data.indexOf(item) === index);

    localStorage.setItem("Fav_data", JSON.stringify(filteredArray));
    setOpen(true);
  };

  return (
    <div>
      <Header detailpage={true} />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          contact added successfully in favourites
        </Alert>
      </Snackbar>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <img src={contact.data && contact.data.avatar} />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            contact.data
              ? `${contact.data.first_name}  ${contact.data.last_name}`
              : null
          }
          subheader="September 14, 2016"
        />
        <CardMedia
          className={classes.media}
          image={contact.data ? contact.data.avatar : null}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {contact.data ? contact.data.text : null}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Box width={100} bgcolor="grey.300" p={1} my={0.5}>
              <FavoriteIcon
                onClick={() => addTOFavorites(contact.data)}
                variant="outlined"
              />
            </Box>
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
