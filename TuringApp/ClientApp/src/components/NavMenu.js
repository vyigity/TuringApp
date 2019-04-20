import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

import { helpers } from '../Util';

import LoginModal from './LoginModal';

export class NavMenu extends Component {
    displayName = NavMenu.name

    constructor(props) {

        super(props);

        this.state = {

            showLogin: false,
            isLoggedIn: false,
            userName: null
        }

    }

    modalShow = () => {

        this.setState({ showLogin: true });

    }

    modalClose = () => {

        this.setState({ showLogin: false });
    }

    logout = (data) => {

        helpers.post({

            url: '/api/Account/LogOut',

            notifySuccess: true,
            successMessage: "Logout success.",
            notifyError: true,
            onSuccess: (args) => {

                this.setState({ isLoggedIn: false, userName: null });
            }
        });
    }

    onLogin = (data) => {

        this.setState({ isLoggedIn: true, userName: data.name, showLogin: false });
    }

    render() {

        let userRow = null;

        if (this.state.isLoggedIn) {
            userRow = (<NavItem onClick={this.logout}>
                <Glyphicon glyph='home' /> {this.state.userName} (Logout)
            </NavItem>);
        } else {

            userRow = (<NavItem onClick={this.modalShow}>
                <Glyphicon glyph='home' /> Login
            </NavItem>);
        }

        return (

            <React.Fragment>

                <Navbar inverse fixedTop fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to={'/'}>TuringApp</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>

                            {userRow}

                            <LinkContainer to={'/'} exact>
                                <NavItem>
                                    <Glyphicon glyph='home' /> Products
                            </NavItem>
                            </LinkContainer>

                            <LinkContainer to={'/ShoppingCart'} exact>
                                <NavItem>
                                    <Glyphicon glyph='home' /> Shopping Cart
                            </NavItem>
                            </LinkContainer>

                            <LinkContainer to={'/Payment'} exact>
                                <NavItem>
                                    <Glyphicon glyph='home' /> Payment
                            </NavItem>
                            </LinkContainer>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <LoginModal onHide={this.modalClose} show={this.state.showLogin} onLogin={this.onLogin} />

            </React.Fragment>
        );
    }
}
