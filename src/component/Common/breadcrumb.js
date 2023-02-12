import React, { Component } from 'react';
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

// import C3Chart from 'react-c3js';
import 'c3/c3.css';

class Breadcrumb extends Component {
    render() {
        const itemLength = this.props.breadcrumbItems.length;

        return (
            <React.Fragment>
                    <Row>
                        <Col sm="6">
                            <div className="page-title-box">
                                <h4>{this.props.title}</h4>
                                    <ol className="breadcrumb m-0">
                                        {
                                            this.props.breadcrumbItems.map((item, key) =>
                                                (key+1) === itemLength ?
                                                    <li key={key} className="breadcrumb-item active">{item.title}</li>
                                                :   <li key={key} className="breadcrumb-item"><Link to="#">{item.title}</Link></li>
                                            )
                                        }
                                    </ol>
                            </div>
                        </Col>
                       
                    </Row>
            </React.Fragment>
        );
    }
}

const mapStatetoProps = state => {
    const Layout = state.Layout;
    const BreadcrumbData = state.Breadcrumb
    return {layoutType : Layout.layoutType, title : BreadcrumbData.title, breadcrumbItems : BreadcrumbData.breadcrumbItems };
};

export default connect(mapStatetoProps, { })(Breadcrumb);