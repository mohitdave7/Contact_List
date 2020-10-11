import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import './home.css';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function Contact(props) {
    var contactlist;
    let history = useHistory();
    const [open, setOpen] = React.useState(false);

    if(props.fromfav){
        contactlist=JSON.parse(props.data);
    }
    else{
        contactlist=props.data
        
    }
    const handleClick =(e,id)=>{
        e.stopPropagation();
        history.push(`/contact/:${id}`)
      };


      const RemoveContact =(e,item)=>{
        e.stopPropagation();
        var data= contactlist.filter(x => {
            return x.id != item.id;
          })
          localStorage.setItem("Fav_data",JSON.stringify(data))
          setOpen(true)
          history.push("/home")
    };



    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setOpen(false);
      };
    const classes = useStyles();


  return (
    <div >
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Contact Removed successfully from favourites
        </Alert>
      </Snackbar>
      {contactlist &&
        contactlist.map((item, i) => (
          <Paper className={classes.paper}  key={`paper${i}`}>
            <Grid item xs={12} sm container onClick={(e)=>handleClick(e,item.id)}>
              <Grid>
                <Avatar>{<img src={item.avatar} />}</Avatar>
              </Grid>
              <Grid><span className="green"></span></Grid>
              <Grid item xs zeroMinWidth>
                <Typography>
                  {item.first_name} {item.last_name}
                </Typography>
                <Typography>{item.email}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">{"10:42AM"}</Typography>
               {props.fromfav? 
                <IconButton aria-label="delete" className={classes.margin}>
                     <DeleteIcon onClick={(e)=>RemoveContact(e,item)}/>
                 </IconButton>
                 :null}

              </Grid>
            </Grid>
          </Paper>
        ))}
    </div>
  );
}
