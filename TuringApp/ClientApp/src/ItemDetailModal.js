import React from 'react';

import { Modal, Button, Row, Form, Grid,Col } from 'react-bootstrap';

import TabPanel from 'devextreme-react/tab-panel';

import { Button as DevButton, TextBox, SelectBox, NumberBox } from 'devextreme-react';

import TabImageItem from './TabImageItem';

import notify from 'devextreme/ui/notify';

import helpers from './Util';

import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';

export class ItemDetailModal extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            quantity: 1,
            imageData: [],
            selectedIndex: 0,
            selectedProduct: null,
            sizes: [],
            colors: [],
            selectedSize: null,
            selectedColor: null
        }
    }

    quantityTextBox = null;

    getImagesFromProp = () => {

        let imageData = [];

        imageData.push({ Name: "1. Image", src: this.props.masterdata.Image });
        imageData.push({ Name: "2. Image", src: this.props.masterdata.Image2 });

        this.setState({ imageData: imageData });
    }

    componentDidMount() {

        this.getImagesFromProp();

        helpers.get({

            url: '/odata/AttributeValue?$filter=AttributeId eq 1',

            onSuccess: (data) => {

                this.setState({ sizes: data.value })
            }
        });

        helpers.get({

            url: '/odata/AttributeValue?$filter=AttributeId eq 2',

            onSuccess: (data) => {

                this.setState({ colors: data.value })
            }
        });
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

    onQuantityChanged = (item) => {

        this.setState({
            quantity: item.value
        });
    }

    addToCartClick = (e) => {

        e.preventDefault();

        let data = {
            ProductId: this.props.masterdata.ProductId,
            Quantity: this.state.quantity,
            Attributes: JSON.stringify({ Size: this.state.selectedSize, Color: this.state.selectedColor })
        };

        helpers.post({

            url: '/odata/ShoppingCart',

            data: data,

            notifySuccess: true,
            successMessage: "Item added to cart.",

            notifyError: true,

            onSuccess: (response) => {

                notify("Purchasing succeed.");
            }
        });
    }

    onSizeChange = (args) => {

        this.setState({ selectedSize: args.value });
    };

    onColorChange = (args) => {

        this.setState({ selectedColor: args.value });
    };

    render() {
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Product Details
                </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ padding: "30px" }}>
                    <form action={'/odata/ShoppingCart'} onSubmit={this.addToCartClick}>
                        <Row>
                            <Row>
                                <Col sm={2}>

                                    Name:

                                        </Col>

                                <Col sm={10}>

                                    {this.props.masterdata.Name}

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={2}>

                                    Description:

                                        </Col>

                                <Col sm={10}>

                                    {this.props.masterdata.Description}

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={2}>

                                    Price:

                                        </Col>

                                <Col sm={10}>

                                    {this.props.masterdata.Price}

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={2}>

                                    Discounted Price:

                                        </Col>

                            <Col sm={10}>

                                    {this.props.masterdata.DiscountedPrice}

                                </Col>
                            </Row>

                            <Row>
                                <Col sm={2}>

                                    Size:

                                        </Col>

                                <Col sm={10}>

                                    <SelectBox items={this.state.sizes}
                                        valueExpr="AttributeValueId"
                                        displayExpr="Value"
                                        placeholder={'Choose size'}
                                        showClearButton={true} onValueChanged={this.onSizeChange} >

                                        <Validator>
                                            <RequiredRule message={'*'} />
                                        </Validator>

                                    </SelectBox>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={2}>

                                    Size:

                                        </Col>

                                <Col sm={10}>

                                    <SelectBox items={this.state.colors}
                                        valueExpr="AttributeValueId"
                                        displayExpr="Value"
                                        placeholder={'Choose color'}
                                        showClearButton={true} onValueChanged={this.onColorChange}>

                                        <Validator>
                                            <RequiredRule message={'*'} />
                                        </Validator>

                                    </SelectBox>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm={2}>

                                    Quantity:

                                        </Col>

                                <Col sm={10}>

                                    <NumberBox placeholder={'Enter quantity here...'}
                                        onValueChanged={this.onQuantityChanged}
                                        value={this.state.quantity}
                                        showSpinButtons={true}
                                        min={1}>

                                        <Validator>
                                            <RequiredRule message={'*'} />
                                        </Validator>
                                    </NumberBox>
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
                                //onClick={this.addToCartClick}
                                useSubmitBehavior={true}
                            />

                        </Row>
                    </form>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}