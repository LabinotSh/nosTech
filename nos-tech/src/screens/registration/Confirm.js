import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Notifications, { notify } from "react-notify-toast";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import Spinner from "../../components/icons/Spinner";
import ReactTooltip from "react-tooltip";
import "./confirm.css";

const Confirm = (props) => {
  const [confirming, setConfirming] = useState(true);

  const toastColor = { background: "#6279AB", text: "#FFFFFF" };

  const confirmEmail = (props) => {
    const { id } = props.match.params;
    axios
      .get(`${API_URL}/email/confirm/${id}`)
      .then((res) => {
        setTimeout(() => {
          setConfirming(false);
        }, 3500);
        notify.show(
          <div>
            {res.data.msg}
            <button
              className="btn btn-sm btn-outline-light" onClick={notify.hide}
            > X </button>
          </div>,
          "custom",
          4000,
          toastColor
        );
      })
      .catch((err) =>{ 
        setConfirming(false);
        console.log(err)});
  };

  useEffect(() => {
    confirmEmail(props);
  }, [notify]);

  return (
    <div className="container text-center c1">
      <div className="confirm justify-content-center">
        <Notifications options={{ width:'800px',top: "10px" }} />
        <ReactTooltip
              place="top"
              backgroundColor={"#6279AB"}
              type="success"
              effect="solid"
              className="tool"
            />
        {confirming ? (
            <Spinner size="7x" spinning={"spinning"} />
          ) : (  
            <Redirect  to='/login'/>  
          )
        }
      </div>
    </div>
  );
};

export default Confirm;