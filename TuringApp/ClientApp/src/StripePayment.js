import React, { Component } from 'react';
import { Elements, StripeProvider } from 'react-stripe-elements';
import CheckoutForm from './CheckOutForm';
import { Width } from 'devextreme-react/chart';

export default class StripePayment extends Component {

    render() {

        return (
            <div style={{ width: "300px" }}>
            <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
                <div className="example">
                    <h1>Pay for Products</h1>
                    <Elements>
                        <CheckoutForm />
                    </Elements>
                </div>
                </StripeProvider>
            </div>
        );
    }
}