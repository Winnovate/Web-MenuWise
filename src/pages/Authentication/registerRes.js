import React, { Component } from "react";
// import { Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Container, Row, Col, Card, CardBody, Alert, Button } from "reactstrap";
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { getDatabase, ref, set } from "firebase/database";
import secureLocalStorage from "react-secure-storage";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

class RestaurantRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [{ title: "Register Restaurant", link: "#" }],
      restaurantname: "",
      address: "",
      coordinates: "",
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setBreadcrumbItems(
      "Register your restaurant with us",
      this.state.breadcrumbItems
    );
    secureLocalStorage.getItem("user");
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(e.target.value);
  };

  handleSubmit = (e) => {
    const db = getDatabase();
    set(ref(db, "restruants/" + secureLocalStorage.getItem("user")), {
      "general-info": {
        name: this.state.restaurantname,
        address: this.state.address,
        coordinates: this.state.coordinates,
        // city: this.state.city,
        // country: this.state.country,
        // states: this.state.states,
      },
      "menu-categories": {},
      items: [],
    })
      .then(() => {
        console.log("Data Successfully Store!");
        this.setState({
          restaurantname: "",
          address: "",
          city: "",
          states: "",
          country: "",
        });
        window.location.assign("/addcategory");
      })
      .catch((err) => {
        throw err;
      });
  };

  handleAddressSelect = (value) => {
    console.log(value);
    if (value) {
      this.setState({ address: value?.label || "" });
      geocodeByPlaceId(value?.value?.place_id)
        .then((results) => {
          const lat = results[0]?.geometry?.location.lat();
          const long = results[0]?.geometry?.location.lng();
          this.setState({ coordinates: `${lat},${long}` });
        })
        .catch((error) => console.error(error));
    }
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
                    <div className="p-3">
                      <AvForm className="form-horizontal mt-4">
                        <label htmlFor="username">Restaurant Name</label>
                        <AvField
                          name="restaurantname"
                          value={this.state.restaurantname}
                          onChange={this.changeHandler}
                          placeholder="Enter name of your restaurant"
                          type="text"
                        />
                        <label htmlFor="username">Please enter location</label>
                        {/* <br /> */}
                        {/* <label htmlFor="userpassword">Address</label> */}
                        {/* <AvField
                          name="address"
                          value={this.state.address}
                          onChange={this.changeHandler}
                          type="text"
                          placeholder="Enter address"
                        /> */}

                        {/* <label htmlFor="userpassword">City</label>
                        <AvField
                          name="city"
                          value={this.state.city}
                          onChange={this.changeHandler}
                          type="text"
                          placeholder="Enter city"
                        /> */}
                        {/* <label htmlFor="userpassword">State</label>
                        <AvField
                          name="states"
                          value={this.state.states}
                          onChange={this.changeHandler}
                          type="text"
                          placeholder="Enter state"
                        /> */}
                        {/* <label htmlFor="userpassword">Country</label>
                        <AvField
                          name="country"
                          value={this.state.country}
                          onChange={this.changeHandler}
                          type="text"
                          placeholder="Enter country"
                        /> */}
                        <div className="form-horizontal mb-4">
                          <GooglePlacesAutocomplete
                            selectProps={{
                              onChange: this.handleAddressSelect,
                              isClearable: true,
                            }}
                          />
                        </div>
                        <div
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          <Button
                            color="primary"
                            onClick={this.handleSubmit}
                            className="w-md waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </Button>
                        </div>
                      </AvForm>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default connect(null, { setBreadcrumbItems })(RestaurantRegister);
