import axios from "axios";
import { useEffect, useState } from "react"
import { useHistory } from "react-router";
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
function CompanyPage() {
    const classes = useStyles();
    let [companyName, setCompanyName] = useState('');
    let [skills, setSkills] = useState('');
    let [experience, setExperience] = useState('');
    let [userId, setUserId] = useState('')
    companyName = companyName.toUpperCase();
    let history = useHistory();
    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let sendTosaveJob = (e) => {
        let companyEmail = localStorage.getItem('userId')
        e.preventDefault();
        let data = {
            companyName,
            skills,
            experience,
            companyEmail
        }
        axios.post(`${appSettings.serverbaseUrl}/company/job`, data)
            .then(res => {
                console.log("res")
                console.log(res)
                history.push('/')
            })
            .catch(err => {
                console.log("err");
                console.log(err);
            })
    }
    let gotoJobs = () => {
        history.push('/')
    }
    let gotoProfile = () => {
        history.push("/company/profile", { data: { userId } })
    }
    useEffect(() => {
        let user = localStorage.getItem('userId')
        setUserId(user)
    })
    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Company Page
                        <div></div>
                        <Button onClick={gotoJobs} color="inherit">Jobs</Button>
                        <Button onClick={gotoProfile} color="inherit">Profile</Button>
                        <Button color="inherit"></Button>
                    </Typography>
                    <Button onClick={logOut} color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
        <br />

        <form onSubmit={sendTosaveJob}>
            <h3>Jobs</h3>
            <div className="form-group">
                <label>Company Name:</label>
                <input type="text" className="form-control" placeholder="Enter Comapny Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Requirement:</label>
            </div>

            <div className="form-group">
                <label>Skills:</label>
                <input type="text" className="form-control" placeholder="Enter Skills" value={skills} onChange={(e) => setSkills(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Experience:</label>
                <input type="text" className="form-control" placeholder="Enter Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
            </div>


            <button type="submit" className="btn btn-primary btn-block">Submit</button>
            <br />
        </form>

    </>
}
export default CompanyPage