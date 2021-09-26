import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import axios from 'axios'
import appSettings from '../appSettings'



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
function CompanyProfile() {
    const classes = useStyles();


    let location = useLocation();
    let [jobs, setJobs] = useState('')
    // let [candidate, setCandidate] = useState([])
    console.log(jobs)

    let history = useHistory()

    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let getAllJobs = () => {
        let user = location.state.data.userId
        axios.post(`${appSettings.serverbaseUrl}/company/find/jobs`, { user })
            .then(res => {
                console.log(res)
                setJobs(res.data.findedJobs)

            })
            .catch(err => {
                console.log(err)
            })
    }
    let deleteThisJob = (id) => {
        console.log(id)
        axios.post(`${appSettings.serverbaseUrl}/company/delete/job`, { id })
            .then(res => {
                console.log(res)
                getAllJobs()
            })
            .catch(err => {
                console.log(err)
            })
        axios.post(`${appSettings.serverbaseUrl}/company/delete/candidate`, { id })
            .then(res => {
                console.log(res)
                getAllJobs()
            })
            .catch(err => {
                console.log(err)
            })
    }

    let gotoCandidate = (candidate) => {
        console.log(candidate)
        history.push('/candidate', { data: candidate })
    }

    let showCandidate = (id) => {
        console.log("candidate id")
        console.log(id)
        axios.post(`${appSettings.serverbaseUrl}/company/find/candidate`, { id })
            .then(res => {
                console.log(res)
                // setCandidate(res.data.findedCandidate)
                gotoCandidate(res.data.findedCandidate)
            })
            .catch(err => {
                console.log("err")
                console.log(err)
            })
    }
    let postNewJob = () => { 
        history.push("/home")
    }
    let gotoJobPage = () => {
        history.push("/")
    }

    useEffect(() => {
        getAllJobs()
    }, [])

    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Company Posted Jobs
                        <div></div>
                        <Button onClick={postNewJob} color="inherit">Post new job</Button>
                        <Button onClick = {gotoJobPage} color="inherit">All Jobs</Button>
                        {/* <Button  color="inherit">Companies List</Button> */}
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
                        <StyledTableCell align="right" ></StyledTableCell>
                        {/* <StyledTableCell align="right"></StyledTableCell> */}
                        <StyledTableCell align="right">Requirements</StyledTableCell>
                        <StyledTableCell align="right" colSpan='2'>Candidates</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
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
                            <StyledTableCell align="right"><Button onClick={() => { showCandidate(job._id) }} variant="contained" color="primary" >Candidates</Button></StyledTableCell>
                            <StyledTableCell align="right"><Button onClick={() => { deleteThisJob(job._id) }} variant="contained" color="secondary" >Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}
    </>
}
export default CompanyProfile;