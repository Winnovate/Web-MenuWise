import React, { Component } from 'react';
import { Container, Row, Col, Alert,Button, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {  registerUser, clearError, clearErrorLogin} from '../../store/actions';
// import logodark from "../../assets/images/logo-dark.png";
import { AvForm, AvField } from 'availity-reactstrap-validation';
//firebase
// import {auth} from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import  secureLocalStorage  from  "react-secure-storage";
class Pagesregister extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
    }

    // handleSubmit(event, values) {
    //     this.props.registerUser(values)
    // }

    componentDidMount()
    {
        this.props.clearError();
        this.props.clearErrorLogin();
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.value);
    }

    handleSubmit = event => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then(user => {
        console.log(user);
        secureLocalStorage.setItem("user", user.user.uid);
        this.setState({ error: null });
        window.location.assign("/restaurantregister");
        // Perform additional logic for a successful login
        })
        .catch(error => {
        if (error.code === 'auth/invalid-email') {
            console.error('Invalid email address');
            } else {
            console.error(error);
            }
        // console.log(error)
        // this.setState({ error });
        });
    };


    render() {

        return (
            <React.Fragment>
                <div className="account-pages my-5 pt-sm-5">
                    <Container>
                        <Row className="justify-content-center">
                            <Col md="8" lg="6" xl="5">
                                <Card className="overflow-hidden">
                                    <CardBody className="pt-0">
                                        {/* <h3 className="text-center mt-4">
                                            <Link to="/index" className="logo logo-admin"><img src={logodark} height="30" alt="logo"/></Link>
                                        </h3> */}
                                        <div className="p-3">
                                            <h4 className="text-muted font-size-18 mb-1 text-center">Free Register</h4>
                                            <p className="text-muted text-center">Get your free MenuWise account now.</p>
                                            {this.props.user && <Alert color="success">
                                           Registration Done Successfully.</Alert>}

                                            {this.props.registrationError && <Alert color="danger">
                                                {this.props.registrationError}</Alert>}

                                            <AvForm onValidSubmit={this.handleSubmit} className="form-horizontal mt-4">

                                                <div className="form-group">
                                                    <label htmlFor="useremail">Email</label>
                                                    <AvField type="email" value={this.state.email} onChange={this.changeHandler} className="form-control" name="email" placeholder="Enter email"/>
                                                </div>

                                                {/* <div className="form-group">
                                                    <label htmlFor="username">Username</label>
                                                    <AvField type="text" className="form-control" name="username" placeholder="Enter username"/>
                                                </div> */}

                                                <div className="form-group">
                                                    <label htmlFor="userpassword">Password</label>
                                                    <AvField type="password" value={this.state.password} onChange={this.changeHandler} className="form-control" name="password" placeholder="Enter password"/>
                                                </div>

                                                <div className="form-group row mt-4">
                                                    <Col xs="12" className="text-right">
                                                        <Button  color="primary" onClick={this.handleSubmit} className="btn btn-primary w-md waves-effect waves-light" type="submit">Register</Button>
                                                    </Col>
                                                </div>

                                                {/* <div className="form-group mb-0 row">
                                                    <Col xs="12" className="mt-4">
                                                        <p className="text-muted mb-0 font-size-14">By registering you agree to the Lexa <Link to="#" className="text-primary">Terms of Use</Link></p>
                                                    </Col>
                                                </div> */}
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p>Already have an account ? <Link to="/login" className="text-primary"> Login </Link> </p>
                                    {/* <p>© 2018 - 2020 Lexa. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p> */}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {

    const { user, registrationError, loading } = state.Account;
    return { user, registrationError, loading };
}

export default connect(mapStatetoProps, { registerUser, clearError, clearErrorLogin })(Pagesregister);