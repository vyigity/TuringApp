import React from 'react';

import { Modal, Button, Row, Form as ReactForm, Grid,Col } from 'react-bootstrap';

import { Button as DevButton, TextBox, SelectBox, NumberBox } from 'devextreme-react';

import Form, { Item } from 'devextreme-react/form';

import notify from 'devextreme/ui/notify';

import { helpers } from '../Util';

import {
    Validator,
    RequiredRule
} from 'devextreme-react/validator';


export class LoginModal extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

        }

        this.userName = null;
        this.password = null;
    }

    onUserNameChanged = (args) => {

        this.userName = args.value;
    }

    onPasswordChanged = (args) => {

        this.password = args.value;
    }

    login = (args) => {

        let data = {

            userName: this.userName,
            password: this.password
        };

        helpers.post({

            url: '/api/Account/Login',

            data: data,

            notifySuccess: true,
            successMessage: "Login success.",
            notifyError: true
        });
    }

    render() {
        return (

            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop="static"
            >

                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login
                </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{ padding: "30px" }}>

                    <Form labelLocation={"left"}
                        colCount={1}
                        id={'form'}
                    >
                        <Item label={{ text: "User Name" }} editorType={'dxTextBox'} editorOptions={{ onValueChanged: this.onPasswordChanged }} />
                        <Item label={{ text: "Password" }} editorType={'dxTextBox'} editorOptions={{ onValueChanged: this.onUserNameChanged }}/>
                                
                    </Form>

                    <div style={{ marginTop: "10px", textAlign: "center" }}>

                        <DevButton

                            icon={'check'}
                            width={200}
                            text={"LOGIN"}
                            type={"success"}
                            stylingMode={"contained"}
                            onClick={this.login}
                        />

                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default LoginModal;
