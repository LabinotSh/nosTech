import React, { Component, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Notifications, { notify } from "react-notify-toast";
import axios from "axios";
import { API_URL } from "../../constants/Constants";
import Spinner from "../../components/icons/Spinner";
import SignInIcon from "../../components/icons/SignIn";
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
        setConfirming(false);
        // notify.show(res.data.msg);
        notify.show(
          <div>
            {res.data.msg}
            <button
              className="btn btn-sm btn-outline-light" onClick={notify.hide}
            > X </button>
          </div>,
          "custom",
          -1,
          toastColor
        );
      })
      .catch((err) => console.log(err));
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
            <Link to="/login">
              <SignInIcon size="8x" />
              <span class="hover"
            data-tip="Head over to login!"
            ></span>
            </Link>
          )
          // : <Redirect to='/login'/>
        }
      </div>
    </div>
  );
};

export default Confirm;
