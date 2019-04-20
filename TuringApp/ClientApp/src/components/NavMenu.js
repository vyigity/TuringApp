import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

import LoginModal from './LoginModal';

export class NavMenu extends Component {
    displayName = NavMenu.name

    constructor(props) {

        super(props);

        this.state = {

            showLogin : false

        }

    }

    modalShow = () => {

        this.setState({ showLogin: true });

    }

    modalClose = () => {

        this.setState({ showLogin: false });

    }

    render() {
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

                                <NavItem onClick={this.modalShow}>
                                    <Glyphicon glyph='home' /> Login
                            </NavItem>

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

                <LoginModal onHide={this.modalClose} show={this.state.showLogin} />

                </React.Fragment>
        );
    }
}
