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


function JobsList() {

    const classes = useStyles();
    let history = useHistory();

    let [jobs, setJobs] = useState([]);
    let gotoHome = () => {
        history.push("/home")
    }
    let gotoStudentsList = () => {
        history.push('/student/list')
    }
    let gotoCompaniesList = () => {
        history.push("/companies/list")
    }
    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let deleteCandidate = (id) => {
        axios.post(`${appSettings.serverbaseUrl}/company/delete/candidate`, { id })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let getAllJobs = () => {
        axios.get(`${appSettings.serverbaseUrl}/company/jobs`)
            .then(res => {
                console.log(res)
                setJobs(res.data.allJobs)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let deleteJob = (id) => {
        axios.post(`${appSettings.serverbaseUrl}/company/delete/job`, { id })
            .then(res => {
                deleteCandidate(id)
                console.log(res)
                getAllJobs()
            })
            .catch(err => {
                console.log(err)
            })

    }
    useEffect(() => {
        getAllJobs()
    }, [])
    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Jobs List
                        <div></div>
                        <Button onClick={gotoHome} color="inherit">Home</Button>
                        <Button onClick={gotoStudentsList} color="inherit">Students List</Button>
                        <Button onClick={gotoCompaniesList} color="inherit">Companies List</Button>
                    </Typography>
                    <Button onClick={logOut} color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
        <br />
        {jobs ? <TableContainer component={Paper}>

            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>company Name</StyledTableCell>
                        <StyledTableCell align="right">company Email</StyledTableCell>
                        <StyledTableCell align="right" >Requirements</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map((job) => (
                        <StyledTableRow key={job._id}>
                            <StyledTableCell component="th" scope="row">
                                {job.companyName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{job.companyEmail}</StyledTableCell>
                            <StyledTableCell align="right">Skills:- {job.skills}</StyledTableCell>
                            <StyledTableCell align="right">Experience:- {job.experience}</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={() => { deleteJob(job._id) }}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}
    </>
}
export default JobsList;