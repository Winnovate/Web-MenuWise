import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, Alert, Button } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkLogin, clearErrorLogin, clearError } from '../../store/actions';
import { AvForm, AvField } from 'availity-reactstrap-validation';

//firebase
// import {auth} from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// import logodark from "../../assets/images/logo-dark.png";

class Pageslogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // handleSubmit(event, values) {
    //     this.props.checkLogin(values.username, values.password, this.props.history);
    // }

    componentDidMount() {
        this.props.clearErrorLogin();
        this.props.clearError();
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.value);
    }

    handleLogin = (e) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then(user => {
          console.log(user.user.uid, "user id");
          localStorage.setItem("user", JSON.stringify(user.user.uid));
          if(localStorage.getItem("user")){
            console.log("Something is stored")
          }
          this.setState({ error: null });
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
        this.props.checkLogin(this.state.email, this.state.password, this.props.history);
    }

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
                                            <Link to="\" className="logo logo-admin"><img src={logodark} height="30" alt="logo" /></Link>
                                        </h3> */}
                                        <div className="p-3">
                                            <h4 className="text-muted font-size-18 mb-1 text-center">Welcome Back !</h4>
                                            <p className="text-muted text-center">Sign in to continue to MenuWise.</p>
                                            {this.props.user && <Alert color="success">
                                                Your Login is successfull.</Alert>}

                                            {this.props.loginError && <Alert color="danger">
                                                {this.props.loginError}</Alert>}
                                            <AvForm className="form-horizontal mt-4" onValidSubmit={this.handleSubmit}>

                                                <label htmlFor="username">Username</label>
                                                <AvField name="email" value={this.state.email} onChange={this.changeHandler} placeholder="Enter Email" type="text" />

                                                <label htmlFor="userpassword">Password</label>
                                                <AvField name="password" value={this.state.password} onChange={this.changeHandler} type="password" placeholder="Enter password" />

                                                <div style={{ display: "flex", justifyContent: "center" }}>
                                                    {/* <Col xs="6">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                                            <label className="custom-control-label" htmlFor="customControlInline">Remember me</label>
                                                        </div>
                                                    </Col> */}
                                                    
                                                        <Button color="primary" onClick={this.handleLogin}  className="w-md waves-effect waves-light" type="submit">Log In</Button>
                                                    
                                                </div>
                                                {/* <div className="form-group mb-0 row">
                                                    <Col xs="12" className="mt-4">
                                                        <Link to="/forget-password" className="text-muted"><i className="mdi mdi-lock"></i> Forgot your password?</Link>
                                                    </Col>
                                                </div> */}
                                            </AvForm>
                                        </div>
                                    </CardBody>
                                </Card>
                                <div className="mt-5 text-center">
                                    <p>Don't have an account ? <Link to="/register" className="text-primary"> Signup Now </Link></p>
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
    const { user, loginError, loading } = state.Login;
    return { user, loginError, loading };
}

export default withRouter(connect(mapStatetoProps, { checkLogin, clearErrorLogin, clearError })(Pageslogin));




