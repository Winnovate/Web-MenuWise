import React, { Component } from "react";
// import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

import {Col, Row, Card, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner} from "reactstrap";
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

import { MDBDataTable } from "mdbreact";

//Import datatable css
import "../Tables/datatables.scss";
import { getDatabase, ref, onValue, orderByChild, query, equalTo} from "firebase/database";

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [{ title: "Order History", link: "#" }],
      orderFound: false,
      orderHistory: [],
      isLoading : true,
    };
  }

  componentDidMount() {
    this.getOrderHistory();
    this.props.setBreadcrumbItems("Order History", this.state.breadcrumbItems);
  }

  async getOrderHistory() {
    const db = getDatabase();  // localStorage.getItem("user")
    const orders = [];

    const dbRef = query( ref( db, "/restruants/" + "0d73ce9a-63bf-425a-b051-858ce0e3b249" + "/orders"), orderByChild("orderStatus"), equalTo("completed"));
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        orders.push(childSnapShot.val());
      });

    if (orders != null) {
      
      orders.sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      this.setState({
        orderFound: true,
        orderHistory: orders,
        isLoading:false,
      });
    } 
    else {
      console.log("No Data Found");
      this.setState({
        orderFound: false,
        isLoading:false,
      });
    }
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
    rows: this.state.orderHistory.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
  };
    return (
      <React.Fragment>
        {this.state.isLoading ? (
        <>
          <center><Spinner animation="border" role="status"/></center>
        </>
      ): 
      (<>
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
      </>
      )} 
      </React.Fragment>
    );
  }
}

export default connect(null, { setBreadcrumbItems })(OrderHistory);
