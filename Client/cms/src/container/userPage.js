import { useEffect } from "react";
import { useHistory } from "react-router";
import Job from "../detailsForm/job";

function UserPage(props) {
    let history = useHistory();
    let user = props.user
    // console.log(user)
   


    return <>
        <Job user={user}></Job>
    </>
}
export default UserPage;