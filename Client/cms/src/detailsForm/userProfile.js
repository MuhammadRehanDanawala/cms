import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import appSettings from "../appSettings";





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




function UserProfile() {
    const classes = useStyles();

    let history = useHistory()
    let [jobs, setJobs] = useState([])
    let location = useLocation();
    console.log(jobs)
    console.log(location)

    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let appliedJob = () => {
        let userId = location.state.data.emailId
        console.log(userId)
        axios.post(`${appSettings.serverbaseUrl}/company/find/appliedJobs`, { userId })
            .then(res => {
                console.log(res)
                setJobs(res.data.appliedJobs)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let deleteThisJob = (id) => {
        console.log(id)
        axios.post(`${appSettings.serverbaseUrl}/company/delete`, { id })
            .then(res => {
                console.log(res)
                appliedJob()
            })
            .catch(err => {
                console.log(err)
            })
    }
    let gotoJobPage = () => {
        history.push("/home")
    }
    useEffect(() => {
        appliedJob();
    }, [])

    return <>

        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Student Profile
                        <div></div>
                        <Button onClick={gotoJobPage} color="inherit">All Jobs</Button>
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
                        <StyledTableCell align="right">Requirements</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
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
                            <StyledTableCell align="right">Skills:- {job.companyRequirement.skills}</StyledTableCell>
                            <StyledTableCell align="right">Experience:- {job.companyRequirement.experience}</StyledTableCell>
                            <StyledTableCell align="right"></StyledTableCell>
                            <StyledTableCell align="right"><Button onClick={() => { deleteThisJob(job._id) }} variant="contained" color="secondary" >Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}
    </>
}
export default UserProfile





      








