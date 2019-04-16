import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import notify from 'devextreme/ui/notify';

class CheckOutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {

        let { token } = await this.props.stripe.createToken({ name: "Name" });
        let data = { tokenId: token.id };

        let response = await fetch("api/StripePayment/DoPayment", {
           
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(data)
        });

        if (response.ok) {

            notify("Purchasing succeed.");
        }
    }

    render() {
        return (
            <div className="checkout">
                <p>Would you like to complete the purchase?</p>
                <CardElement />
                <button onClick={this.submit}>Send</button>
            </div>
        );
    }
}

export default injectStripe(CheckOutForm);