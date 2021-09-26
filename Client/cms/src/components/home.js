import UserPage from '../container/userPage'
import CompanyPage from '../container/companyPage'
import AdminPage from '../container/adminPage'
import { useHistory} from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'
import appSettings from '../appSettings'

function Home() {
    let [user, setUser] = useState('')
    let [receivedUser, setReceivedUser] = useState('')
    let history = useHistory();
    // let location = useLocation()
    // let user = location.state.data.userData
    let checkUser = () => {
        let email = localStorage.getItem('userId')
        if (!email) {
            history.push('/sign-in')
            return
        }
        setUser(email)
    }
    
    useEffect(() => {
        checkUser()
    },[])


    useEffect(() => {
        axios.post(`${appSettings.serverbaseUrl}/users/find`, { user })
            .then(res => {
                setReceivedUser(res.data.signedInUser)
            })
            .catch(err => {
            })
    })
   
    return <>


        {receivedUser ? <div>
            {receivedUser.userType === 'student' || receivedUser.userType === 'company' ? <>{receivedUser.userType === 'student' ? <UserPage user={receivedUser}></UserPage> : <CompanyPage></CompanyPage>}</>:<><AdminPage/></> }
        </div> : <h1>Loading..</h1>
        }
    </>

}

export default Home;

