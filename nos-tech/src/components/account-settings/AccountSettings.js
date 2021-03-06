import React, {useState, useEffect}  from "react";
import "./account-settings.css";
import { Button } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../../redux/actions/userActions'
import {logout} from '../../redux/actions/auth'
import jwt_decode from 'jwt-decode';

function AccountSettings() {

  const dispatch = useDispatch();
  const[user,setUser] = useState({})

  const userDelete = useSelector(state => state.userDelete)
  const {success:userDeleteSuccess} = userDelete


  useEffect(() => {
    try {
        const token = localStorage.getItem('user')
        if(token) {
            const useri = jwt_decode(token)       
            setUser(useri)
        }
    }catch(e) {
        console.log(e)
    }
},[]) 

 useEffect(() => {
   console.log("nalt" + userDeleteSuccess)
   if(userDeleteSuccess) {
     console.log("posht "+userDeleteSuccess)
     dispatch(logout())
   }

 },[userDeleteSuccess])

  const deleteUserHandler = (id) => {
    if(window.confirm("Are you sure?")) {
    dispatch(deleteUser(id))
    }
}

  return (
    <div className="account-settings text-center">
      <h3 style={{ marginBottom: "25px" }}>Deleting your account</h3>
      <p>
        Your account will automatically be deactivated immediately per our
        existing reclaim policies once you click &nbsp;
        <em>
          <strong>'Delete my Account'</strong>
        </em>
        .
      </p>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        As an important reminder, once you delete your account:
      </p>
      <p className="delete-list">
        - Your list of courses will no longer be available to you.
        <br />
        - You will no longer receive subscription emails about our latest news.
        <br />- You will no longer be able to login without registering a new
        account.
      </p>
      <p className="delete-list" style={{ fontSize: "12px" }}>
        Are you sure you want to proceed?
      </p>
      <Button className="deleteMyAccountBtn text-center" onClick={() => deleteUserHandler(user._id)}>
        Delete my Account
      </Button>
    </div>
  );
}

export default AccountSettings;
