import React, { Component } from "react";
// import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

import {
  Col,
  Row,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

import { MDBDataTable } from "mdbreact";

//Import datatable css
import "../Tables/datatables.scss";
import { getDatabase, ref, onValue, set } from "firebase/database";

class TodaysOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [{ title: "Today's Order", link: "#" }],
      orderFound: false,
      todaysOrder: [],
      todaysDate: "",
    };
  }

  componentDidMount() {
    this.generateTodaysDate();
    this.props.setBreadcrumbItems(
      "Todays's Order History",
      this.state.breadcrumbItems
    );
    this.getOrderList();
  }

  getOrderList() {
    const db = getDatabase();
    const starCountRef = ref(
      db, // localStorage.getItem("user")
      "/restruants/" + "0d73ce9a-63bf-425a-b051-858ce0e3b249" + "/orders"
    );
    onValue(starCountRef, (snapshot) => {
      const orders = snapshot.val();

      if (orders != null) {
        this.setState({
          orderFound: true,
        });

        this.splitData(orders);
      } else {
        console.log("No Data Found");
        this.setState({
          orderFound: false,
        });
      }
    });
  }

  splitData(data) {
    let orderList = [];

    Object.keys(data).map((order) => {
      if (
        data[order].timestamp.includes(this.state.todaysDate) &&
        data[order].orderStatus != "completed"
      ) {
        orderList.push(data[order]);
      }
    });

    orderList.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    this.setState({
      todaysOrder: orderList,
    });
  }

  generateTodaysDate() {
    var today = new Date();
    let date =
      today.getDate() +
      " " +
      today.toLocaleString("default", { month: "short" }) +
      " " +
      today.getFullYear();

    this.setState({
      todaysDate: date,
    });
  }

  render() {
    const data = {
      columns: [
        {
          label: "Customer Name",
          field: "customerName",
          width: 150,
        },
        {
          label: "Order Items",
          field: "orderItems",
          width: 270,
        },
        {
          label: "Order Status",
          field: "orderStatus",
          width: 270,
        },
        {
          label: "Timestamp",
          field: "timestamp",
          sort: "asc",
          width: 270,
        },
        {
          label: "Action",
          field: "action",
          width: 270,
        },
      ],
      rows: this.state.todaysOrder,
    };
    return (
      <React.Fragment>
        {!this.state.orderFound ? (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Row>
                <img
                  src=""
                  alt="food"
                  style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: 200,
                    height: 200,
                  }}
                />
              </Row>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Row>
                <p>No order record found</p>
              </Row>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card>
                <CardBody>
                  <MDBDataTable responsive bordered data={data} />
                </CardBody>
              </Card>
            </div>
          </>
        )}
      </React.Fragment>
    );
  }
}

export default connect(null, { setBreadcrumbItems })(TodaysOrder);
