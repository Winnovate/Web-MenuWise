import React, { Component } from "react";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import QRCode from "qrcode";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

class QrGenereate extends Component {
  constructor(props) {
    super(props);
    this.qr = "";
    this.restaurantID = localStorage.getItem("user");
    this.state = {
      breadcrumbItems: [{ title: "QR Code", link: "#" }],
    };
  }

  componentDidMount() {
    this.props.setBreadcrumbItems("Dashboard", this.state.breadcrumbItems);
    this.genearteQRcode();
  }

  genearteQRcode() {
    let url = this.restaurantID;
    QRCode.toDataURL(
      url,
      {
        width: 400,
        height: 400,
        margin: 2,
        color: {
          dark: "#335383FF",
          light: "#EEEEEEFF",
        },
      },
      (err, url) => {
        if (err) return console.error(err);
        this.qr = url;
      }
    );
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <center>
            <img src={this.qr} />
            <br />
            <br />
            <Button color="primary" href={`${this.qr}`} download="QRCode.png">
              Download
            </Button>
          </center>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { setBreadcrumbItems })(QrGenereate);
