import React, { Component } from 'react';
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

import { MDBDataTable } from 'mdbreact';

//Import datatable css
import "../Tables/datatables.scss";

class OrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Order History", link : "#" },
            ],
            orderFound: false, 
        }
    }

    componentDidMount(){
        this.props.setBreadcrumbItems("Order History", this.state.breadcrumbItems);
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Customer Name',
                    field: 'cname',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Order Items',
                    field: 'oitems',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Order Status',
                    field: 'ostatus',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Timestamp',
                    field: 'timestamp',
                    sort: 'asc',
                    width: 270
                }
            ],
            rows: [
                {
                    cname: 'Kinjal Prajapati',
                    oitems: 'Pizza',
                    ostatus: 'Completed',
                    timestamp: '01-02-2023',
                    sort: 'asc',
                    width: 150
                },
                {
                    cname: 'Rujuta Raval',
                    oitems: 'Cake',
                    ostatus: 'Completed',
                    timestamp: '13-02-2023',
                    sort: 'asc',
                    width: 150
                },
                {
                    cname: 'Tapan Patel',
                    oitems: 'Sandwich',
                    ostatus: 'Completed',
                    timestamp: '17-02-2023',
                    sort: 'asc',
                    width: 150
                },
                {
                    cname: 'Karna Shah',
                    oitems: 'Puttin',
                    ostatus: 'Completed',
                    timestamp: '22-02-2023',
                    sort: 'asc',
                    width: 150
                },
                {
                    cname: 'Ayush Rana',
                    oitems: 'Sandwich',
                    ostatus: 'Completed',
                    timestamp: '10-02-2023',
                    sort: 'asc',
                    width: 150
                },
                
            ]
        };
        return (
            <React.Fragment>
                 {
                    this.state.orderFound ? <>
                        <div style={{ display: "flex", justifyContent: "center"}}>
                        <Row>
                            <img src="" alt="food" style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: 200, height: 200}} /> 
                        </Row> 
                        
                        </div> 
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <Row>
                                <p>No order record found</p>
                            </Row> 
                        </div> 
                            </>
                    : <>
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <Card>
                                <CardBody>
                                    <MDBDataTable
                                        responsive
                                        bordered
                                        data={data}
                                    />
                                </CardBody>
                            </Card>
                        </div>
                    </>
                } 
                   
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(OrderHistory);