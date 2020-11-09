import React from "react";
import "./my-profile.css";
import TabNav from "../../components/tabnav/TabNav";
import Tab from "../../components/tab/Tab";
import { Form } from "react-bootstrap";
import PersonalInfo from "../../components/personal-info/PersonalInfo";
import Password from "../../components/password/Password";
import AccountSettings from "../../components/account-settings/AccountSettings";

class MyProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: "Personal Information",
    };
  }

  setSelected = (tab) => {
    this.setState({ selected: tab });
  };
  render() {
    return (
      <div className="forum-div">
        <div className="forum-div-child">
          <TabNav
            tabs={["Personal Information", "Password", "Account Settings"]}
            selected={this.state.selected}
            setSelected={this.setSelected}
            className="tabnav-class"
          >
            <Tab isSelected={this.state.selected === "Personal Information"}>
              <PersonalInfo />
            </Tab>
            <Tab isSelected={this.state.selected === "Password"}>
              <Password />
            </Tab>
            <Tab isSelected={this.state.selected === "Account Settings"}>
              <AccountSettings />
            </Tab>
          </TabNav>
        </div>
      </div>
    );
  }
}

export default MyProfile;
