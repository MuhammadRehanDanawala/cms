import { useLocation, useHistory } from "react-router"
import appSettings from '../appSettings'
import axios from 'axios'

import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
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



function FindedJobs() {
    const classes = useStyles();
    let history = useHistory();
    let location = useLocation();
    let jobs = location.state.data
    let [userId, setUserId] = useState('')
    let [userType, setUserType] = useState('')
    let [studentEmail, setStudentEmail] = useState('')
    let [studentSkills, setStudentSkills] = useState('')
    let [studentExperience, setStudentExperience] = useState('')
    let [appliedJobs, setAppliedJob] = useState([])
    let [user, setUser] = useState({})
    console.log(user)
    console.log(appliedJobs)

    let findUser = () => {
        let usertype = localStorage.getItem('userType')
        setUserType(usertype)
        let user = localStorage.getItem('userId')

        axios.post(`${appSettings.serverbaseUrl}/users/find`, { user })
            .then(res => {
                setUser(res.data.signedInUser)
                setStudentEmail(res.data.signedInUser.emailId)
                setStudentSkills(res.data.signedInUser.portfolio.skills)
                setStudentExperience(res.data.signedInUser.portfolio.experience)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let addUserportfolio = () => {
        history.push('/user-portfolio', { data: user })
    }
    let gotoSignin = () => {
        history.push('/sign-in')
    }
    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let checkAppliedJobs = (userId) => {
        axios.post(`${appSettings.serverbaseUrl}/company/find/appliedJobs`, { userId })
            .then(res => {
                console.log(res)
                setAppliedJob(res.data.appliedJobs)

            })
            .catch(err => {
                console.log(err)
            })
    }
    let applyJob = (jobId, companyEmail, skills, experience, companyName) => {
        let data = {
            jobId,
            companyEmail,
            companyRequirement: {
                skills,
                experience
            },
            companyName,
            studentEmail,
            studentExperience,
            studentSkills
        }
        axios.post(`${appSettings.serverbaseUrl}/company/apply/job`, data)
            .then(res => {
                console.log(res)
                checkAppliedJobs(userId)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let gotoJobPage = () => {
        history.push("/")
    }
    let undoThisJob = (id) => {
        let data = {
            id,
            userId
        }
        axios.post(`${appSettings.serverbaseUrl}/company/undo`, data)
            .then(res => {
                console.log(res)
                checkAppliedJobs(userId)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let goToUserProfile = () => {
        history.push('/user/profile', { data: user })
    }
    let gotoProfile = () => {
        history.push("/company/profile", { data: { userId } })
    }
    useEffect(() => {
        let userId = localStorage.getItem('userId')
        let userType = localStorage.getItem('userType')
        findUser();
        checkAppliedJobs(userId)
        setUserId(userId)
        console.log(userId)

    }, [])
    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Jobs List
                        <div></div>
                        
                        {userId ?<>{userType === 'company' ? <><Button onClick={gotoProfile} color="inherit">Profile</Button> </> :<><Button onClick={goToUserProfile} color="inherit">User Profile </Button></>}</> : <></>}
                        <Button onClick={gotoJobPage} color="inherit">All Jobs </Button>
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
                            {userType ? <>{userType === 'student' ? <>{user.hasOwnProperty('portfolio') ? <>{!appliedJobs.find(appliedjob => appliedjob.jobId === job._id) ? <Button style={{top : '5px'}} variant="contained" color="primary" onClick={() => { applyJob(job._id, job.companyEmail, job.skills, job.experience, job.companyName) }}>Apply Now</Button> : <><Button style={{top : '5px'}}  variant="contained" color="primary" onClick={() => undoThisJob(job._id)}>Undo</Button></>}</> : <><Button style={{top : '5px'}} variant="contained" color="primary" onClick={addUserportfolio}>Add PortFolio</Button></>}</> : <></>}</> : <></>}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}

                    {/* <StyledTableCell align="right"><Button variant="contained" color="primary" onClick={() => { showAllJob(job.companyName) }}>Show More</Button></StyledTableCell> */}





    </>
}
export default FindedJobs;




