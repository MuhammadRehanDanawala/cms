import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"
import appSettings from "../appSettings"
import { Link } from 'react-router-dom'


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


function Job(props) {
    let user = props.user
    // console.log(user)
    const classes = useStyles();


    let history = useHistory()
    let [jobs, setJobs] = useState([])
    let [userType, setUserType] = useState('')
    // console.log(jobs)

    let gotoSignin = () => {
        history.push('/sign-in')
    }
    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let addUserportfolio = () => {
        history.push('/user-portfolio', { data: user })
    }

    let goToUserProfile = () => {
        history.push('/user/profile', { data: user })
    }


    let showAllJob = (name) => {
        let value = name
        JSON.stringify(value)
        axios.post(`${appSettings.serverbaseUrl}/company/find/job`, { value })
            .then(res => {
                console.log(res)
                history.push(`/job/findedJobs`, { data: res.data.findedJobs })
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        let getUserType = localStorage.getItem('userType')
        setUserType(getUserType)
        axios.get(`${appSettings.serverbaseUrl}/company/jobs`)
            .then(res => {
                setJobs(res.data.allJobs)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Jobs List
                        <div></div>
                        {user ? <>{user.userType === 'student' ? <>{user.hasOwnProperty('portfolio') ? <Button onClick={goToUserProfile} color="inherit">User Profile </Button> : <Button onClick={addUserportfolio} color="inherit">Add PortFolio</Button>}
                        </> : <></>}</> : <></>}
                    </Typography>
                    {userType ? <Button onClick={logOut} color="inherit">LogOut</Button> : <Button onClick={gotoSignin} color="inherit">LogIn</Button>}
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
                            <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={() => { showAllJob(job.companyName) }}>Show More</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}





    </>
}
export default Job;