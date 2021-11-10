import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
    errormsg:{
        color: 'red'
    }
  },
}));

export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false);
  const baseURL = 'http://localhost:8000'

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  const handleSubmit = e => {
    e.preventDefault();
    // axios.post({})
    try{
      setLoading(true)
        axios.post(`${baseURL}/auth/jwt/create/`, {email: email, password: password}, config).then((res) => {
            localStorage.setItem("isAuthenticated", true)
            localStorage.setItem("access_token", res.data.access)
            localStorage.setItem("action", 1)
            setIsAuthenticated(true)
      setLoading(false)
        })
        .catch(() => {
          setErr(true)
      setLoading(false)
        }
        )
    }catch(err){
        setErr(true)
      setLoading(false)
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/admin-dashboard" />;
  }
  if (loading) {
    return <Loading />
  }
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
        <Typography variant="h4"> Admin Login </Typography>
    <br/>
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {err?<p className={classes.errormsg}>Invalid Credentials!</p>: null}
      <div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        <p>Don't have an account?</p>
        <Link to="/signup"><Button variant="outlined" color="secondary">
          Register
        </Button>
        </Link>
      </div>
    </form>
  );
};
