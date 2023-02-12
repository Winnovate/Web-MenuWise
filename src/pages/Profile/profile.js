import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";

import { connect } from "react-redux";

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//Import Components
import {
    TabContent,
    TabPane,
    NavLink,
    NavItem,
    Nav,
  } from "reactstrap";
import classnames from "classnames";
import 'c3/c3.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Lexa", link : "#" },
                { title : "Dashboard", link : "#" },
                { title : "Dashboard", link : "#" },
            ],
            activeTab1:"5",
            user : []
        }
        this.toggle1 = this.toggle1.bind(this);
        this.loaduser = this.loaduser.bind(this);
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
          this.setState({
            activeTab1: tab
          });
        }
      }
    componentDidMount(){
        if(localStorage.getItem("token")=== undefined || localStorage.getItem("token")===null || localStorage.getItem("token")===""){
            this.props.history.push('/login');
        }
        this.loaduser()
        this.props.setBreadcrumbItems("Profile", this.state.breadcrumbItems);
    }
    loaduser(){
        var myHeaders = new Headers();
        myHeaders.append("Authorization", localStorage.getItem("token"));

        var raw = "";

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(process.env.REACT_APP_API_URL+"/user", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(result.statusCode==="200"){
                this.setState({
                    user:result.body
                })
            }

        })
        .catch(error => console.log('error', error));
        
    }
    render() {
        const {user} = this.state
        return (
            <React.Fragment>
                <div className="text-center">
                    <Row>
                        <Card className="mx-auto col-8">
                            <h1 className='pt-5 pb-5 text-center'>Your Info</h1>
                                <Nav pills justified>
                                    <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                            active: this.state.activeTab1 === "5"
                                            })}
                                            onClick={() => {
                                            this.toggle1("5");
                                            }}
                                        >
                                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                            <span className="d-none d-sm-block">Request Details</span>
                                    </NavLink>
                                    </NavItem>
                                    <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                            active: this.state.activeTab1 === "6"
                                            })}
                                            onClick={() => {
                                            this.toggle1("6");
                                            }}
                                        >
                                            <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                                            <span className="d-none d-sm-block">Personal Details</span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                            active: this.state.activeTab1 === "7"
                                            })}
                                            onClick={() => {
                                            this.toggle1("7");
                                            }}
                                        >
                                            <span className="d-block d-sm-none"><i className="mdi mdi-bank-outline"></i></span>
                                            <span className="d-none d-sm-block">Bank Details</span>
                                        </NavLink>
                                    </NavItem>
                                    {/* <NavItem className="waves-effect waves-light">
                                    <NavLink
                                        style={{ cursor : "pointer" }}
                                            className={classnames({
                                            active: this.state.activeTab1 === "8"
                                            })}
                                            onClick={() => {
                                            this.toggle1("8");
                                            }}
                                        >
                                            <span className="d-block d-sm-none"><i className="far fa-envelope"></i></span>
                                            <span className="d-none d-sm-block">Documents</span>
                                        </NavLink>
                                    </NavItem> */}
                                </Nav>
                                    <TabContent activeTab={this.state.activeTab1}>
                                        <TabPane tabId="5" className="p-3">
                                                <Card className="overflow-hidden">
                                                    <CardBody className="pt-0">
                                                       <h3 className='text-left pt-5 pl-5'>Request Details</h3>
                                                       <Row>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                    <div className="pt-3">
                                                                        <b>Influencer ID : &nbsp; </b> <span>{user.id}</span>
                                                                    </div>
                                                                    <div className="pt-3">
                                                                    <b>Created At : &nbsp; </b> <span>{user.created_at}</span>
                                                                </div>
                                                                    <div className="pt-3">
                                                                    <b>Status : &nbsp; </b> 
                                                                        {
                                                                            user.status ==="Active" ?
                                                                        <span class="badge badge-pill badge-soft-success font-size-13">Approved
                                                                        </span>
                                                                        :
                                                                        <span class="badge badge-pill badge-soft-danger font-size-13">Pending
                                                                        </span>
                                                                        }
                                                                        
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                <div className="pt-3">
                                                                    <b>Application ID : &nbsp; </b> <span>{user.application_id}</span>
                                                                </div>
                                                                <div className="pt-3">
                                                                    <b>Updated At : &nbsp; </b> <span>{user.updated_at}</span>
                                                                </div>
                                                                <div className="pt-3">
                                                                    <b>Comment &nbsp; </b> <span>{user.comment}</span>
                                                                </div>
                                                                </div>
                                                            </Col>
                                                       </Row>
                                                    </CardBody>
                                                </Card>
                                        </TabPane>
                                        <TabPane tabId="6" className="p-3">
                                            <Card className="overflow-hidden">
                                                    <CardBody className="pt-0">
                                                        <h3 className='text-left pt-5 pl-5'>Personal Details</h3>
                                                       <Row>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                    <div className="pt-3">
                                                                        <b><i className="fas fa-user-alt"></i> Name : &nbsp; </b> <span>{user.name}</span>
                                                                    </div>
                                                                    <div className="pt-3">
                                                                    <b><i className="mdi mdi-email-multiple"></i> Email : &nbsp; </b> <span>{user.email}</span>
                                                                    </div>
                                                                    <div className="pt-3">
                                                                    <b><i className="mdi mdi-email-multiple"></i> Document : &nbsp; </b> <span><a target='_blank' href={process.env.REACT_APP_API_URL+"/user/kyc/"+user.kyc_document} >View</a></span>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                <div className="pt-3">
                                                                    <b><i className="fas fa-phone"></i> Phone : &nbsp; </b> <span>{user.phone}</span>
                                                                </div>
                                                                <div className="pt-3">
                                                                    <b><i className="fas fa-search-location"></i> Address : &nbsp; </b> <span>{user.address}</span>
                                                                </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                        </TabPane>
                                        <TabPane tabId="7" className="p-3">
                                            <Card className="overflow-hidden">
                                                    <CardBody className="pt-0">
                                                    <h3 className='text-left pt-5 pl-5'>Bank Details</h3>
                                                       <Row>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                    <div className="pt-3">
                                                                        <b><i className="fas fa-user"></i> Account Name : &nbsp; </b> <span>{user.bank_account_name}</span>
                                                                    </div>
                                                                    <div className="pt-3">
                                                                    <b><i className="mdi mdi-bank-outline"></i> Bank &nbsp; </b> <span>{user.bank_account_name}</span>
                                                                </div>
                                                                    <div className="pt-3">
                                                                    <b><i className="mdi mdi-bank-minus"></i> Branch : &nbsp; </b>
                                                                    <span>{user.bank_branch}</span>
                                                                    </div>
                                                                    <div className="pt-3">
                                                                    <b><i className="fas fa-money-bill"></i> Currency : &nbsp; </b>
                                                                    <span>{user.currency_term}</span>
                                                                    </div>
                                                                </div>
                                                                   
                                                            </Col>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                <div className="pt-3">
                                                                    <b><i className="mdi mdi-file-document-box-plus-outline"></i> Swift Code : &nbsp; </b> <span>{user.swift_code}</span>
                                                                </div>
                                                                <div className="pt-3">
                                                                    <b><i className="mdi mdi-file-document-box-plus-outline"></i> Account Number : &nbsp; </b> <span>{user.bank_account_no}</span>
                                                                </div>
                                                                <div className="pt-3">
                                                                    <b><i className="mdi mdi-file-document-box-plus-outline"></i> IBAN: &nbsp; </b> <span>{user.iban_code}</span>
                                                                </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                        </TabPane>
                                        {/* <TabPane tabId="8" className="p-3">
                                            <Card className="overflow-hidden">
                                                    <CardBody className="pt-0">
                                                    <h3 className='text-left pt-5 pl-5'>Personal Details</h3>
                                                       <Row>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                    <div className="pt-3">
                                                                        <b>Influencer ID : &nbsp; </b> <span>7233</span>
                                                                    </div>
                                                                    <div className="pt-3">
                                                                    <b>Created At : &nbsp; </b> <span>Oct. 21, 2022, 10:49 a.m.</span>
                                                                    </div>
                                                                    <div className="pt-3">
                                                                    <b>Status : &nbsp; </b> 
                                                                        
                                                                        <span class="badge badge-pill badge-soft-success font-size-13">Approved
                                                                        </span>
                                                                        
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                            <Col  xl="6">
                                                                <div className='text-left'>
                                                                <div className="pt-3">
                                                                    <b>Application ID : &nbsp; </b> <span>REQPT58781872</span>
                                                                </div>
                                                                <div className="pt-3">
                                                                    <b>Updated At : &nbsp; </b> <span>Oct. 25, 2022, 1:28 p.m.</span>
                                                                </div>
                                                                <div className="pt-3">
                                                                    <b>Updated At : &nbsp; </b> <span>Oct. 25, 2022, 1:28 p.m.</span>
                                                                </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                        </TabPane> */}
                                        
                                    </TabContent>
                        </Card>
                    </Row>
                </div>
                    
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(Profile);