import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn:{
    color: 'white',
    textDecoration: 'none'
  }
}));

export default function Navbar() {
  const classes = useStyles();
  const [user, setUser] = useState(false);

  useEffect(() => {
      setInterval(() => {
          const user = localStorage.getItem("isAuthenticated");
          setUser(user);
          }, [])
  }, [5000]);


  const handleClick = () => {
    localStorage.clear()
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Library Management System
          </Typography>
          {user ? <Link to="/"> <Button variant="outlined" className={classes.btn} onClick={handleClick} color="inherit">Logout</Button></Link>:
          <Link to="/login"> <Button variant="outlined" className={classes.btn} color="inherit">Admin Login</Button></Link>}
        </Toolbar>
      </AppBar>
    </div>
  );
}

