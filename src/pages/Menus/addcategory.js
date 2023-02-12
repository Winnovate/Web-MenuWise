import React, { Component } from 'react';
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
import { connect } from "react-redux";
import { AvForm, AvField } from "availity-reactstrap-validation";
//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions";

//image
import food from "../../assets/food.png"
import { MDBDataTable } from 'mdbreact';
import { Link } from "react-router-dom";
//Import datatable css
import "../Tables/datatables.scss";
import uniqid from 'uniqid';
//database
import {db} from "../../firebase-config";
import { getDatabase, ref, onValue, set } from "firebase/database";

// const userCollectionRef = collection(db, "restruants");
class AddCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumbItems : [
                { title : "Menu", link : "#" },
                { title : "Add Category", link : "#" },
            ],
            modal_standard: false,
            categoryFound: false,
            data: [],
            categoryname: "",
            categorylist: []
        }
        this.tog_standard = this.tog_standard.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.addCategory = this.addCategory.bind(this);
        this.getCategory = this.getCategory.bind(this);
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target.value);
    }

    
    componentDidMount(){
        this.props.setBreadcrumbItems("Add Category", this.state.breadcrumbItems);
        this.getCategory()
    }

    getCategory(){
        const db = getDatabase();
        const starCountRef = ref(db, "/restruants/" + localStorage.getItem("user") + "/menu-categories");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data, "dataaaaa")
            if(data === null){
                this.setState({
                    categoryFound: true
                })
                
            }
            else{
                this.setState({
                    categoryFound: false
                })
                var array = []
                
                array = Object.keys(data).map(cat => {
                    return {
                        name: data[cat].name,
                        action: <div><Button type="button"
                                    style={
                                        { marginRight: 10 }
                                    }
                                    color="primary"
                                    className="waves-effect waves-light">
                                    <i className="ti-pencil"></i>
                                </Button>
                                <Button type="button" color="danger"
                                    style={{
                                        marginRight: 10
                                    }}
                                    className="waves-effect waves-light"
                                    id="sa-warning"><i className="ti-trash"></i>
                                </Button>
                                <Link to={{
                                    pathname: "/add-updatemenu",
                                    state: {
                                        categorylist: data[cat]
                                    }
                                }}><Button type="button" color="primary"
                                    className="waves-effect waves-light"
                                    id="sa-warning"><i className="mdi mdi-arrow-right"></i>
                                </Button></Link>
                            </div>
                    }
                })
                // array.push({
                //     name: data
                // })
                console.log("arydsf", array)
                this.setState({
                    categorylist: array
                })
            }
        });
    }

    tog_standard() {
        this.setState(prevState => ({
          modal_standard: !prevState.modal_standard
        }));
    }

    addCategory =() =>{
        const db = getDatabase();
        let prevCat = {};
        const starCountRef = ref(db, "/restruants/" + localStorage.getItem("user") + "/menu-categories");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            prevCat = {...prevCat, ...data}
            console.log(data, "dataaaaa")
        });

        set(ref(db, "restruants/" + localStorage.getItem("user") + "/menu-categories"), {
            ...prevCat,
            [this.state.categoryname + uniqid()]: {
                id: this.state.categoryname + uniqid(),
                name: this.state.categoryname
            }

        })
        
        .then(() => {
            
            console.log("Data Successfully Store!");
            this.setState({
                    id: '',
                    categoryname: '',
                    modal_standard: false, 
                }
            )
           
        })
        .catch(err => {throw(err)})
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Category',
                    field: 'name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Action',
                    field: 'action',
                    sort: 'asc',
                    width: 270
                }
            ],
            rows: this.state.categorylist || []
        };
        console.log(this.state.categorylist, "cat name")
        return (
            <React.Fragment> 
                {
                    this.state.categoryFound ? <>
                        <div style={{ display: "flex", justifyContent: "center"}}>
                        <Row>
                            <img src={food} alt="food" style={{ display: "block", marginLeft: "auto", marginRight: "auto", width: 200, height: 200}} /> 
                        </Row> 
                        
                        </div> 
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <Row>
                                <p>No category record found</p>
                            </Row> 
                        </div> 
                        <div style={{ display: "flex", justifyContent: "center"}}>
                            <Row>
                                <Button color="primary" onClick={this.tog_standard} className="btn btn-primary waves-effect waves-light">Add Category</Button>
                            </Row>
                        </div> </>
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
                        <Row>
                            <Button color="primary" onClick={this.tog_standard} className="btn btn-primary waves-effect waves-light">Add Category</Button>
                        </Row>
                    </>
                }
                

                 <Row>
                    <Col>
                    <Modal
                        isOpen={this.state.modal_standard}
                        toggle={this.tog_standard}
                        autoFocus={true}
                    > 
                                                
                        <ModalHeader toggle={this.tog_standard}>
                            Add Category
                        </ModalHeader >
                        <ModalBody>
                            <Card>
                                <CardBody>
                                    <AvForm>
                                    <AvField
                                        name="categoryname"
                                        label="Category  "
                                        placeholder="add category"
                                        type="text"
                                        value={this.state.categoryname}
                                        onChange = {this.changeHandler}
                                        errorMessage="Enter Name"
                                        validate={{ required: { value: true } }}
                                    />
                                    </AvForm>

                                </CardBody>
                            </Card>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" onClick ={this.addCategory} color="primary" className="waves-effect waves-light">Add</Button>
                        </ModalFooter>                                              
                    </Modal>
                    </Col>   
                </Row> 
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(AddCategory);