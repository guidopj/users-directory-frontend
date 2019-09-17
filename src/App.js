import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  margin: {
    marginTop:10
  }
}));


function App() {
  const classes = useStyles();
  const [people, setPeople] = useState([])
  const [peopleFiltered, setPeopleFiltered] = useState([])


  useEffect(() => {
    axios.get('http://localhost:3000/people')
    .then((people)=>{
        const orderedList = people.data.sort((p1, p2) => (p1.firstName > p2.firstName) ? 1 : -1)
        setPeople(orderedList);
        setPeopleFiltered(orderedList)
      })
    .catch((err)=>{
      console.log(err)
    })
  }, []);

  const filterPeople = (data) => {
    if(data.length >= 3){
      axios.get('http://localhost:3000/people/by-name/' + data)
      .then((peopleFilt)=>{
          setPeopleFiltered(peopleFilt.data)
        })
      .catch((err)=>{
        console.log(err)
      })
    }else{
      setPeopleFiltered(people)
    }
  }

  
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            className={classes.margin}
            label="Find By Name"
            variant="outlined"
            id="mui-theme-provider-outlined-input"
            onChange={(e) => filterPeople(e.target.value)}
          />  
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.root}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Surname</TableCell>
                  <TableCell align="right">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {peopleFiltered.map((person) =>
                  <TableRow key={person.firstName}>
                    <TableCell component="th" scope="row">
                      {person.firstName}
                    </TableCell>
                    <TableCell align="right">{person.lastName}</TableCell>
                    <TableCell align="right">{person.phoneNumber}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <p>People length</p>
          <p>{peopleFiltered.length}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
