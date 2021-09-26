import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import appSettings from '../appSettings';

function LogIn() {

    let [emailId, setEmailId] = useState('');
    let [password, setPassword] = useState('');

    let history = useHistory();


    let attemptSignIn = (e) => {
        e.preventDefault();
        let data = {
            emailId,
            password
        }

        axios.post(`${appSettings.serverbaseUrl}/users/signin`, data)
            .then(res => {
                console.log(res.data.signedInUser)
                localStorage.setItem('userId', res.data.signedInUser.emailId)
                localStorage.setItem('userType', res.data.signedInUser.userType)
                history.push('/home',)
            })
            .catch(err => {
                console.log(err)
            })

    }

    let checkUser = () => {
        let user = localStorage.getItem('userId')
        if (user) {
            history.push("/home")
        }
    }
    useEffect(() => {
        checkUser()
    }, [])
    return (
        <form onSubmit={attemptSignIn}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block">SignIn</button>
            <Link to={'/sign-up'} variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
}

export default LogIn;