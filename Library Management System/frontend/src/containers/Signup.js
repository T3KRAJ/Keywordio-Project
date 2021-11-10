import React, { useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [re_password, setRe_password] = useState('');
  const [err, setErr] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)
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
        axios.post(`${baseURL}/auth/users/`, {email: email, name: name, password: password, re_password: re_password}, config).then((res) => {
            localStorage.setItem("isAuthenticated", true)
            localStorage.setItem("access_token", res.data.access)
            setIsRegistered(true)
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
  }

  if (isRegistered) {
    return <Redirect to="/login" />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
        <Typography variant="h4"> Admin Signup </Typography>
        <br/>
      <TextField
        label="Full Name"
        variant="filled"
        required
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
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
      <TextField
        label="Confirm Password"
        variant="filled"
        type="password"
        required
        value={re_password}
        onChange={e => setRe_password(e.target.value)}
      />
      <div>
        {err? <p>Error occured! Try Again!!</p>: null}
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
        <p>Already have an account?</p>
        <Link to="/login"><Button variant="outlined" color="secondary">
          Login
        </Button>
        </Link>
      </div>
    </form>
  );
};
