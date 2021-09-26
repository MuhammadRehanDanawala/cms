import { useEffect, useState } from "react";
import appSettings from "../appSettings";
import axios from 'axios'


import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";
// import MenuIcon from '@material-ui/icons/Menu';





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
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

// const useStyles = makeStyles({

// });

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));




function StudentList() {
    const classes = useStyles();


    let [students, setStudents] = useState([])
    console.log(students)

    let history = useHistory();


    let deleteThisUser = (id) => {
        axios.post(`${appSettings.serverbaseUrl}/users/delete`, { id })
            .then(res => {
                console.log(res)
                getAllUsers()
            })
            .catch(err => {
                console.log(err)
            })
    }
    let deleteStudent = (id, email) => {
        axios.post(`${appSettings.serverbaseUrl}/company/candidate-delete`, { email })
            .then(res => {
                console.log(res)
                deleteThisUser(id)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let jobsList = () => {
        history.push("/jobs/list")
    }
    let gotoCompaniesList =() => {
        history.push("/companies/list")
    }
    let gotoHome = () => {
        history.push("/home")
    }
    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }

    let getAllUsers = () => {
        axios.get(`${appSettings.serverbaseUrl}/users/find/students`)
            .then(res => {
                console.log(res)
                setStudents(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                    Students List
                        <div></div>
                    <Button onClick={gotoHome} color="inherit">Home</Button> 
                    <Button onClick={gotoCompaniesList} color="inherit">Companies List</Button> 
                    <Button onClick={jobsList} color="inherit">Jobs List</Button>
          </Typography>
                    <Button onClick={logOut} color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
        <br />
        {students ? <TableContainer component={Paper}>
            {/* <h1 style={{ marginLeft: '25%' }}>:</h1> */}

            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Student Name</StyledTableCell>
                        <StyledTableCell align="right">Student Email</StyledTableCell>
                        <StyledTableCell align="right">Student skills</StyledTableCell>
                        <StyledTableCell align="right">Student Experience</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {students.map((student) => (
                        <StyledTableRow key={student._id}>
                            <StyledTableCell component="th" scope="row">
                                {student.userName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{student.emailId}</StyledTableCell>
                            <StyledTableCell align="right">{student.portfolio.skills}</StyledTableCell>
                            <StyledTableCell align="right">{student.portfolio.experience}</StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={() => { deleteStudent(student._id, student.emailId) }}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}
    </>

}
export default StudentList;