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

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [{ title: "Order History", link: "#" }],
      orderFound: false,
      orderHistory: [],
    };
  }

  componentDidMount() {
    this.props.setBreadcrumbItems("Order History", this.state.breadcrumbItems);
    this.getOrderHistory();
  }

  getOrderHistory() {
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
      if (data[order].orderStatus === "completed") {
        orderList.push(data[order]);
      }
    });

    orderList.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    this.setState({
      orderHistory: orderList,
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
          sort: "desc",
          width: 270,
        },
      ],
      rows: this.state.orderHistory,
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

export default connect(null, { setBreadcrumbItems })(OrderHistory);
