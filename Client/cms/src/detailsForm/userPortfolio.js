import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import appSettings from "../appSettings";

function Portfolio() {
    let [skills, setSkills] = useState('')
    let [experience, setExperience] = useState('')
    let [id,  setId] = useState('')
    let history = useHistory();
    let location = useLocation()



    useEffect(() => { 
        setId(location.state.data._id)
    },[])

    let saveDetails = (e) => {

        e.preventDefault();
        let data = {
            skills,
            experience,
            id

        }
        
        axios.post(`${appSettings.serverbaseUrl}/users/update`, data)
            .then(res => {
                console.log(res)
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }
    return <>
        <form onSubmit={saveDetails}>
            <h3>Skills & experience</h3>

            <div className="form-group">
                <label>skills</label>
                <input type="text" value={skills} className="form-control" placeholder="skills" onChange={(e) => setSkills(e.target.value)} />
            </div>
            <div className="form-group">
                <label>experience</label>
                <input type="text" className="form-control" placeholder="experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary btn-block">Save Details</button>

        </form>
    </>
}
export default Portfolio;