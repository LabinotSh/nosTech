import React from "react";
import "./tabnav.css";
import { Link } from "react-router-dom";
import { Media } from "react-bootstrap";

class TabNav extends React.Component {
  render() {
    return (
      <div className="tabnav">
        <ul className="nav nav-tabs">
          {this.props.tabs.map((tab) => {
            const active = tab === this.props.selected ? "active" : "";

            return (
              <Media className="nav-item" key={tab}>
                <Link
                  className={"nav-link " + active}
                  onClick={() => this.props.setSelected(tab)}
                >
                  {tab}
                </Link>
              </Media>
            );
          })}
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default TabNav;
