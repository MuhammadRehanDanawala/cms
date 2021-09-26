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



function CompaniesList() {

    const classes = useStyles();
    let history = useHistory();

    let [companies, setCompanies] = useState([]);


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
    let deleteCompany = (id, email) => {
        axios.post(`${appSettings.serverbaseUrl}/company/delete-all-job`, { email })
            .then(res => {
                console.log(res)
                deleteThisUser(id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    let getAllUsers = () => {
        axios.get(`${appSettings.serverbaseUrl}/users/find/companies`)
            .then(res => {
                console.log(res)
                setCompanies(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    let logOut = () => {
        localStorage.removeItem('userId')
        history.push("/sign-in")
        localStorage.removeItem('userType')
    }
    let gotoHome = () => {
        history.push("/home")
    }
    let jobsList = () => {
        history.push("/jobs/list")
    }
    let gotoStudentsList = () => {
    history.push('/student/list')
    }
    useEffect(() => {
        getAllUsers()
    }, [])
    return <>
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Companies List
                        <div></div>
                        <Button onClick={gotoHome} color="inherit">Home</Button>
                        <Button onClick={gotoStudentsList} color="inherit">Students List</Button>
                        <Button onClick={jobsList} color="inherit">Jobs List</Button>
                    </Typography>
                    <Button onClick={logOut} color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
        <br />
        {companies ? <TableContainer component={Paper}>

            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>company Name</StyledTableCell>
                        <StyledTableCell align="right">company Email</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {companies.map((company) => (
                        <StyledTableRow key={company._id}>
                            <StyledTableCell component="th" scope="row">
                                {company.userName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{company.emailId}</StyledTableCell>
                            <StyledTableCell align="right"><Button variant="contained" color="secondary" onClick={() => { deleteCompany(company._id, company.emailId) }}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer> : <>Loading...!</>}
    </>
}
export default CompaniesList;