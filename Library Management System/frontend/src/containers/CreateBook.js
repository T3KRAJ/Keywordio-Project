import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import axios from 'axios';
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Loading from "./Loading";

export default function Update({ book }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState();
  const [author, setAuthor] = React.useState();
  const [edition, setEdition] = React.useState();
  const [category, setCategory] = React.useState();
  const [loading, setLoading] = React.useState(false);
const access = localStorage.getItem('access_token')
const action = parseInt(localStorage.getItem('action'))
const baseURL = 'http://localhost:8000'

  const handleClickOpen = () => {
    setOpen(true);
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `JWT ${access}`
    },
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault()
    try{
        setLoading(true)
        axios.post(`${baseURL}/api/book/`, {title: title, author: author, category: category, edition: edition}, config).then((res) => {
            console.log("Success")
            localStorage.setItem("action", action+1)
            setLoading(false)
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
    setCategory('')
    setEdition('')
    setTitle('')
    setAuthor('')
    handleClose()
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
        startIcon={<EditIcon />}
      >
        New Book
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Book</DialogTitle>
        <form>
        <DialogContent>
        
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Book Title"
            type="text"
            fullWidth
            value = {title}
            onChange={(e) => setTitle(e.target.value)}

          />
          <TextField
            autoFocus
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
           <TextField
            autoFocus
            margin="dense"
            id="edition"
            label="Edition"
            type="text"
            fullWidth
            value={edition}
            onChange={(e) => setEdition(e.target.value)}
          />
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => handleSubmit(e)}  color="primary">
            Create
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
