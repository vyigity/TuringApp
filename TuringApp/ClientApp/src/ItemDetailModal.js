import React from 'react';

import { Modal, Button, Row, Form, Grid,Col } from 'react-bootstrap';

import TabPanel from 'devextreme-react/tab-panel';

import { Button as DevButton } from 'devextreme-react';

import TabImageItem from './TabImageItem';

import notify from 'devextreme/ui/notify';

export class ItemDetailModal extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            imageData: [],
            selectedIndex: 0
        }
    }

    getImagesFromProp = () => {

        let imageData = [];

        imageData.push({ Name: "1. Image", src: this.props.masterData.Image });
        imageData.push({ Name: "2. Image", src: this.props.masterData.Image2 });

        this.setState({ imageData: imageData });
    }

    componentDidMount() {

        this.getImagesFromProp();
    }

    onSelectionChanged = (args) => {
        if (args.name == 'selectedIndex') {
            this.setState({
                selectedIndex: args.value
            });
        }
    }

    itemTitleRender = (item) => {

        return <span>{item.Name}</span>;
    }

    addToCartClick = () => {

        notify("Item added to cart");
    }

    render() {
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Product Details
                </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ padding: "30px" }}>

                    <Row>
                        <Row>
                            <Col sm={2}>

                                Name:

                                        </Col>

                            <Col sm={10}>

                                {this.props.masterData.Name}

                            </Col>
                        </Row>

                        <Row>
                            <Col sm={2}>

                                Description:

                                        </Col>

                            <Col sm={10}>

                                {this.props.masterData.Description}

                            </Col>
                        </Row>

                        <Row>
                            <Col sm={2}>

                                Price:

                                        </Col>

                            <Col sm={10}>

                                {this.props.masterData.Price}

                            </Col>
                        </Row>

                        <Row>
                            <Col sm={2}>

                                Discounted Price:

                                        </Col>

                            <Col sm={10}>

                                {this.props.masterData.DiscountedPrice}

                            </Col>
                        </Row>
                    </Row>

                    <Row>

                        <TabPanel
                            height={"auto"}
                            width={"100%"}
                            dataSource={this.state.imageData}
                            selectedIndex={this.state.selectedIndex}
                            loop={false}
                            itemComponent={TabImageItem}
                            animationEnabled={true}
                            swipeEnabled={true}
                            itemTitleRender={this.itemTitleRender}
                            onOptionChanged={this.onSelectionChanged}

                        />

                    </Row>
                    <Row style={{ marginTop: "10px", textAlign: "center" }}>

                        <DevButton

                        icon={'check'}
                        width={250}
                        text={"Add to Cart"}
                        type={"success"}
                        stylingMode={"contained"}
                        onClick={this.addToCartClick}
                    />

                    </Row>

                </Modal.Body>
            <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
            </Modal >
        );
    }
}