import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import SignUp from "./components/signup";
import Home from './components/home';
import Portfolio from './detailsForm/userPortfolio'
import Jobs from './detailsForm/job'
import FindedJobs from './detailsForm/findedJobs'
import UserProfile from './detailsForm/userProfile';
import CompanyProfile from './detailsForm/companyProfile';
import LogIn from './components/login';
import Candidate from './detailsForm/candidate';
import StudentList from './container/studentList';
import CompaniesList from './container/companiesList';
import JobsList from './container/jobsList';

function App() {
  return <>
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Jobs}></Route>
              <Route path="/home"><Home /></Route>
              <Route path="/sign-in" component={LogIn}></Route>
              <Route path="/sign-up" component={SignUp} />
              <Route path="/student/list" component={StudentList } ></Route>
              <Route path="/jobs/list" component={JobsList}></Route>
              <Route path="/companies/list" component={CompaniesList } ></Route>
              <Route path="/user-portfolio" component={Portfolio} />
              <Route path="/job/findedJobs" component={FindedJobs}></Route>
              <Route path="/user/profile" component={UserProfile}></Route>
              <Route path="/company/profile" component={CompanyProfile}></Route>
              <Route path="/candidate" component={Candidate}></Route>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  </>
}

export default App;