import { useLocation, useHistory } from "react-router";
import axios from 'axios'
import React from 'react';
import appSettings from '../appSettings'
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


function Candidate() {
    const classes = useStyles();
    let history = useHistory()

    let location = useLocation()
    let candidate = location.state.data
    console.log(candidate)
    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let postNewJob = () => {
        history.push("/home")
    }
    let gotoProfile = () => {
        let userId = localStorage.getItem('userId')
        history.push("/company/profile", { data: { userId } })
    }
    let gotoJobPage = () => {
        history.push("/")
    }
    let approveRequest = (email) => {
        console.log(email)
        axios.post(`${appSettings.serverbaseUrl}/company/approve`)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let deleteRequest = (email) => {
    }



    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Candidates List
                        <div></div>
                        <Button onClick={postNewJob} color="inherit">Post New Job</Button>
                        <Button onClick={gotoProfile} color="inherit">Profile</Button>
                        <Button onClick={gotoJobPage} color="inherit">All Jobs</Button>
                    </Typography>
                    <Button onClick={logOut} color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
        <br />
        {candidate ? <TableContainer component={Paper}>

            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>student Email</StyledTableCell>
                        <StyledTableCell align="right">Student Skills</StyledTableCell>
                        <StyledTableCell align="right" >Student Experience</StyledTableCell>
                        <StyledTableCell align="right">Approve</StyledTableCell>
                        <StyledTableCell align="right">Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {candidate.map((candidate) => (
                        <StyledTableRow key={candidate._id}>
                            <StyledTableCell component="th" scope="row">
                                {candidate.studentEmail}
                            </StyledTableCell>
                            <StyledTableCell align="right">{candidate.studentSkills}</StyledTableCell>
                            <StyledTableCell align="right">{candidate.studentExperience}</StyledTableCell>
                            <StyledTableCell align="right"><Button onClick={() => { approveRequest(candidate.studentEmail) }} variant="contained" color="primary">Approve</Button></StyledTableCell>
                            <StyledTableCell align="right"><Button onClick={() => { deleteRequest(candidate.studentEmail) }} variant="contained" color="secondary">Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}
    </>
}
export default Candidate;