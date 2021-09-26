import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import appSettings from '../appSettings';


import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
function Signup() {
    let history = useHistory();
    let [userName, setUserName] = useState('');
    let [userType, setUserType] = useState('');
    let [emailId, setEmailId] = useState('');
    let [password, setPassword] = useState('');
    let [check, setCheck] = useState([]);

    let attemptSignup = (e) => {
        let data = {
            userName,
            userType,
            emailId,
            password
        }
        e.preventDefault();
        axios.post(`${appSettings.serverbaseUrl}/users/signup`, data)
            .then(res => {
                console.log(res)
                localStorage.setItem('userId', res.data.newUser.emailId)
                localStorage.setItem('userType', res.data.newUser.userType)
                history.push("/home")
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        axios.get(`${appSettings.serverbaseUrl}/users/find/admin`)
            .then(res => {
                console.log(res)
                setCheck(res.data.status)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <form onSubmit={attemptSignup}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>Username</label>
                <input type="text" required value={userName} className="form-control" placeholder="Username" onChange={(event) => setUserName(event.target.value)} />
            </div>
            <FormControl component="fieldset">
                <FormLabel component="legend">User Type</FormLabel>
                <RadioGroup aria-label="gender" name="gender1" value={userType} onChange={(e) => { setUserType(e.target.value) }}>
                    <FormControlLabel value="student" control={<Radio />} label="student" />
                    <FormControlLabel value="company" control={<Radio />} label="company" />
                    {!check ? <FormControlLabel value="admin" control={<Radio />} label="admin" />:<></>}
                </RadioGroup>
            </FormControl>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" value={emailId} onChange={(e) => setEmailId(e.target.value)} className="form-control" placeholder="Enter email" required />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <Link to="/sign-in">sign in?</Link>
            </p>
        </form >
    );
}
export default Signup;