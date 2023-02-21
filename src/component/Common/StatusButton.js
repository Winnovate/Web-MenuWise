import React, { Component } from "react";

import "../../App.css";

//Import datatable css

class StatusButton extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      constValues: ["Pending", "In Progress", "completed"],
      currentValue: "Fetching...",
      dropDownToggle: false,
    };
  }

  componentDidMount() {
    this.setState({
      currentValue: this.props.value,
    });
  }

  handleChange = (newValue) => {
    this.props.handleStatusChange(newValue, this.props.orderID);
    this.setState({ currentValue: newValue, dropDownToggle: false });
  };

  handleToggle = () => {
    this.setState({ dropDownToggle: !this.state.dropDownToggle });
  };

  downSvg = () => (
    <>
      <svg
        fill="#ffffff"
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g data-name="Layer 2">
          <g data-name="arrow-downward">
            <rect
              width="24"
              height="24"
              transform="rotate(-90 12 12)"
              opacity="0"
            />
            <path d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05 2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17z" />
          </g>
        </g>
      </svg>
    </>
  );

  render() {
    return (
      <React.Fragment>
        <div className="c-btn-wrapper">
          <div
            className={`c-status-btn ${this.state.currentValue
              .split(" ")
              .join("-")}`}
          >
            {this.state.currentValue}
          </div>
          <div className="dropdown-toggle-btn" onClick={this.handleToggle}>
            {this.downSvg()}
          </div>
          {this.state.dropDownToggle && (
            <div className="c-dropdown-wrapper">
              <div
                onClick={() => this.handleChange("Pending")}
                className="c-dropdown-items"
              >
                Pending
              </div>
              <div
                onClick={() => this.handleChange("completed")}
                className="c-dropdown-items"
              >
                completed
              </div>
              <div
                onClick={() => this.handleChange("In Progress")}
                className="c-dropdown-items"
              >
                In Progress
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default StatusButton;
