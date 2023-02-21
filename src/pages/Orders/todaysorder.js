import React, { Component } from "react";
// import { Row, Col } from "reactstrap";
import { connect } from "react-redux";

import {
  Col,
  Row,
  Card,
  CardBody,
  Button,
  Spinner,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
//import Select from 'react-select'
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

import { MDBDataTable } from "mdbreact";

//Import datatable css
import "../Tables/datatables.scss";
import {
  getDatabase,
  ref,
  onValue,
  orderByChild,
  equalTo,
  query,
  update,
} from "firebase/database";
import StatusButton from "../../component/Common/StatusButton";

class TodaysOrder extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = {
      breadcrumbItems: [{ title: "Today's Order", link: "#" }],
      orderFound: false,
      todaysOrder: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getOrderList();
    this.props.setBreadcrumbItems(
      "Todays's Order History",
      this.state.breadcrumbItems
    );
  }

  handleChange = (newStatus, orderId) => {
    const db = getDatabase();
    update(
      ref(
        db,
        "/restruants/" +
          "0d73ce9a-63bf-425a-b051-858ce0e3b249" +
          "/orders/" +
          orderId +
          "/"
      ),
      {
        orderStatus: newStatus,
      }
    );
    this.getOrderList();
  };

  async getOrderList() {
    const db = getDatabase(); // localStorage.getItem("user")
    const orders = [];
    let action = [
      { value: "Pending" },
      { value: "In Progress" },
      { value: "completed" },
    ];
    let data;

    let dbRef = query(
      ref(
        db,
        "/restruants/" + "0d73ce9a-63bf-425a-b051-858ce0e3b249" + "/orders"
      ),
      orderByChild("orderStatus"),
      equalTo("Pending")
    );
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        data = childSnapShot.val();
        //
        //data.action = <Button id ={data["order-id"]} onClick={this.handleChange} type="button" color="primary">Pending</Button>
        data.action = (
          <DropdownMenu id={data["order-id"]}>
            <DropdownItem header> {data["orderStatus"]} </DropdownItem>{" "}
            <DropdownItem>Pending</DropdownItem>{" "}
            <DropdownItem>In Progress</DropdownItem>{" "}
            <DropdownItem>completed</DropdownItem>
          </DropdownMenu>
        );
        // data.action = <Select id = {data["order-id"]} options = {action} onChange = {this.handleChange} defaultValue={data["orderStatus"]}></Select>
        data.action = (
          <StatusButton
            value={data["orderStatus"]}
            orderID={data["order-id"]}
            handleStatusChange={this.handleChange}
          />
        );
        orders.push(data);
      });
    });

    dbRef = query(
      ref(
        db,
        "/restruants/" + "0d73ce9a-63bf-425a-b051-858ce0e3b249" + "/orders"
      ),
      orderByChild("orderStatus"),
      equalTo("In Progress")
    );
    onValue(dbRef, (snapshot) => {
      snapshot.forEach((childSnapShot) => {
        data = childSnapShot.val();
        // data.action = ()

        //data.action = <Select id = {data["order-id"]} options = {action} onChange = {this.handleChange} defaultValue={data["orderStatus"]}></Select>
        //data.action = <Button id ={data["order-id"]} onClick = {() => {this.handleChange(data["order-id"])}} type="button" color="success">In Progress</Button>
        orders.push(data);
      });

      if (orders != null) {
        this.setState({
          orderFound: true,
          todaysOrder: orders,
          isLoading: false,
        });
      } else {
        console.log("No Data Found");
        this.setState({
          orderFound: false,
          isLoading: false,
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
      rows: this.state.todaysOrder.sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      ),
    };
    return (
      <React.Fragment>
        {this.state.isLoading ? (
          <>
            <center>
              <Spinner animation="border" role="status" />
            </center>
          </>
        ) : (
          <>
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

export default connect(null, { setBreadcrumbItems })(TodaysOrder);
