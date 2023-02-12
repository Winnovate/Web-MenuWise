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
import { toBeInTheDOM } from '@testing-library/jest-dom';
import { MDBDataTable } from 'mdbreact';
import "../Tables/datatables.scss";
import { getDatabase, ref, onValue, set } from "firebase/database";
import uniqid from 'uniqid';

class AddUpdateMenu extends Component {
    constructor(props) {
        super(props);
        const { categorylist } = this.props.location.state;
        this.state = {
            breadcrumbItems : [
                { title : "Menu", link : "#" },
                { title : "Add/Update Menu", link : "#" },
            ],
            modal_standard: false,
            catList: categorylist.name,
            catid: categorylist.id,
            itemname: '',
            price: '',
            description: '',
            item: [],
            userid: localStorage.getItem("user")
        }
        this.tog_standard = this.tog_standard.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.getMenuItem = this.getMenuItem.bind(this);
        }

    componentDidMount(){
        this.props.setBreadcrumbItems("Menu", this.state.breadcrumbItems);
        console.log("helo", this.state.catid);
        this.getMenuItem(true)
    }

    tog_standard() {
        this.setState(prevState => ({
          modal_standard: !prevState.modal_standard
        }));
    }

    getMenuItem = (initial = false ) => {
        const db = getDatabase();
        let previtem = [];
        console.log(this.state, "Xdvdsfsfs")
        let array = [];
        if(!initial){
             array = [{
                catid: this.state.catid,
                id: this.state.itemname.split(" ").join("-") + uniqid(),
                name: this.state.itemname,
                details:this.state.description,
                price:this.state.price,
                // action: <div>
                //         <Button type="button"
                //             style={
                //                 { marginRight: 10 }
                //             }
                //             color="primary"
                //             className="waves-effect waves-light">
                //             <i className="ti-pencil"></i>
                //         </Button>
                //         <Button type="button" color="danger"
                //             style={{
                //                 marginRight: 10
                //             }}
                //             className="waves-effect waves-light"
                //             id="sa-warning"><i className="ti-trash"></i>
                //         </Button>
                //     </div>
            }]
        }
       
        const starCountRef = ref(db, "/restruants/" + localStorage.getItem("user") + "/items");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if(data){
                console.log(data, "Dfsdgfds")
                previtem = [...previtem, ...data]
            }
            const filterDataByCatId = previtem.filter(item => item.catid === this.state.catid);
            console.log(filterDataByCatId,previtem, "Sdfsdfsdfdsfsdf")
            this.setState({
                item: [...array, ...filterDataByCatId]
            })
        });
        console.log(array, "kinjal")
    }
    
    addMenuItems = () => {
        const db = getDatabase();
        let previtem = {};
        var array = [{
            catid: this.state.catid,
            id: this.state.itemname.split(" ").join("-") + uniqid(),
            name: this.state.itemname,
            details:this.state.description,
            price:this.state.price,
        }]

        let updatededData = {};
        const starCountRef = ref(db, "/restruants/" + localStorage.getItem("user") + "/items");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            if(Array.isArray(data) && data.length > 0){
                
                array = [...array, ...data]
            }
            updatededData = {...data, ...Object.assign({}, array)}
            console.log(typeof data, array, "Xvxvxcvxc")
        });

        set(ref(db, "restruants/" + localStorage.getItem("user") + "/items"), {
            ...updatededData
        }
        )
        .then(() => {
            console.log("Data Successfully Store!");
            const filterDataByCatId = array.filter(item => item.catid === this.state.catid)
            console.log(filterDataByCatId, "dsfsdfsd")
            this.setState({
                    id: '',
                    itemname: '',
                    modal_standard: false, 
                    item: filterDataByCatId
                }
            )
           
        })
        .catch(err => {throw(err)}) 

        
    }



    changeHandler = (e) => {
        console.log(this.state, "sdfsf")
        this.setState({ [e.target.name]: e.target.value });
        // console.log(e.target.value);
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Item',
                    field: 'name',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Description',
                    field: 'details',
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
            rows: this.state.item
        };
        console.log(this.state.item, "sdfsdfsd")
        return (
            <React.Fragment>
                <Button color="primary" className="btn btn-primary waves-effect waves-light" onClick={this.tog_standard}>Add Menu</Button>
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
                                        <h4>Enter food items in category {this.state.catList}</h4>
                                        <AvField
                                            name="itemname"
                                            label="Item Name  "
                                            placeholder="enter item name"
                                            type="text"
                                            errorMessage="Enter Name"
                                            validate={{ required: { value: true } }}
                                            value = {this.state.itemname}
                                            onChange={this.changeHandler}
                                        />
                                        <AvField
                                            name="price"
                                            label="Price  "
                                            placeholder="enter price"
                                            type="number"
                                            errorMessage="Enter Price"
                                            validate={{ required: { value: true } }}
                                            value = {this.state.price}
                                            onChange={this.changeHandler}
                                        />
                                        <AvField
                                            name="description"
                                            label="Description  "
                                            placeholder="enter description"
                                            type="text"
                                            errorMessage="Enter Description"
                                            validate={{ required: { value: true } }}
                                            value = {this.state.description}
                                            onChange={this.changeHandler}
                                        />
                                    </AvForm>

                                </CardBody>
                            </Card>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" onClick={this.addMenuItems} color="primary" className="waves-effect waves-light">Add</Button>
                        </ModalFooter>                                              
                    </Modal>
                    </Col>   
                </Row> 
            </React.Fragment>
        );
    }
}

export default connect(null, { setBreadcrumbItems })(AddUpdateMenu);