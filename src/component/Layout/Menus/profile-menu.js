import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { withRouter } from "react-router-dom";

import { getDatabase, onValue, ref } from "firebase/database";
import secureLocalStorage from "react-secure-storage";

class ProfileMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
    this.toggle = this.toggle.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.restaurant_name = "";
  }

  componentDidMount() {
    if (secureLocalStorage.getItem("name") == null) {
      this.getRestaurantName();
    } else {
      this.restaurant_name = secureLocalStorage.getItem("name");
    }
  }

  getRestaurantName() {
    const db = getDatabase();
    const dbRef = ref(
      db,
      "/restruants/" + secureLocalStorage.getItem("user") + "/general-info"
    );
    try {
      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        secureLocalStorage.setItem("name", data["name"]);
        this.restaurant_name = data["name"];
      });
    } catch (error) {
      console.log(error);
    }
  }

  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }
  onMouseEnter() {
    this.setState({ menu: true });
  }

  onMouseLeave() {
    this.setState({ menu: false });
  }

  render() {
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          onMouseOver={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          toggle={this.toggle}
          className="d-inline-block"
        >
          <DropdownToggle
            tag="button"
            className="btn header-item waves-effect"
            id="page-header-user-dropdown"
          >
            <div className="iconClass">
              <span>{this.restaurant_name[0]}</span>
            </div>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem tag="a" href="#">
              <i className="mdi mdi-account-circle font-size-17 text-muted align-middle mr-1"></i>{" "}
              Profile
            </DropdownItem>
            <DropdownItem tag="a" href="#" divider></DropdownItem>
            <DropdownItem tag="a" href="/logout" className="text-danger">
              <i className="mdi mdi-power font-size-17 text-muted align-middle mr-1 text-danger"></i>{" "}
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}
export default withRouter(ProfileMenu);
