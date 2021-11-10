import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Loading from './Loading';

export default function Delete({book}) {
  const [open, setOpen] = React.useState(false);
  const access = localStorage.getItem('access_token')
  const action = parseInt(localStorage.getItem('action'))
  const [loading, setLoading] = React.useState(false);
  const baseURL = 'http://localhost:8000'
  
  const config = {
    headers: {
      "Authorization": `JWT ${access}`
    },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    try{
        setLoading(true)
        axios.delete(`${baseURL}/api/book/${book.id}/`, config).then((res) => {
            console.log("Success")
            setLoading(false)
            localStorage.setItem("action", action+1)
        })
        .catch((err) => {
            setLoading(false)
            console.log(err)
        }
            
        )
    }catch(err){
        console.log(err)
        setLoading(false)
    }
    handleClose()
}

if (loading) {
    return <Loading />
  }

  return (
    <div>

      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="secondary"
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Book"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete '{book.title}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
