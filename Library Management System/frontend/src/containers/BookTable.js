import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Update from "./Update";
import Delete from "./Delete";
import Loading from "./Loading";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  container: {
    padding: 50,
  },
  table: {
    minWidth: 700,
  },
});

export default function BookTable() {
  const classes = useStyles();
  const [books, setBooks] = useState([])
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(0);

  useEffect(() => {
    setInterval(() => {
      const user = localStorage.getItem("isAuthenticated")
      setUser(user)
      var action = parseInt(localStorage.getItem("action"))
      setAction(action)
    }, [])
    console.log(action)
}, [5000]);
  
  useEffect(() => {
    getBooks()
  },[action])

  const getBooks = async() =>{
    try{
      setLoading(true)

      await axios.get('http://localhost:8000/api/book/')
    .then(function (response) {
        setBooks(response.data)
        setLoading(false)
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false)
    })
    }catch(err){
      setLoading(false)
    }
    
  }

  return (
    <>
    {loading ? <Loading /> : null}
    <div className={classes.container}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SN</StyledTableCell>
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right">Edition</StyledTableCell>
              {
                user?
                <>
                  <StyledTableCell align="right"></StyledTableCell>
                  <StyledTableCell align="right"></StyledTableCell>
                </>
              : null
              }
              

            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <StyledTableRow key={book.id}>
                <StyledTableCell component="th" scope="book">
                  {index+1}
                </StyledTableCell>
                <StyledTableCell align="left">{book.title}</StyledTableCell>
                <StyledTableCell align="right">{book.author}</StyledTableCell>
                <StyledTableCell align="right">{book.category}</StyledTableCell>
                <StyledTableCell align="right">{book.edition}</StyledTableCell>
                {user ? 
                <>
                <StyledTableCell align="right"><Update book={book}/></StyledTableCell>
                <StyledTableCell align="right"><Delete book={book}/></StyledTableCell>
                </>:
                null
                }
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
}
