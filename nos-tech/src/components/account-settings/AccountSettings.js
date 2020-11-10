import React from "react";
import "./account-settings.css";
import { Button } from "react-bootstrap";

function AccountSettings() {
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
      <Button className="deleteMyAccountBtn text-center">
        Delete my Account
      </Button>
    </div>
  );
}

export default AccountSettings;
