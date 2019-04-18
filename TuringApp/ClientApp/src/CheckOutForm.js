import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import notify from 'devextreme/ui/notify';
import helpers from './Util';

class CheckOutForm extends Component {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    async submit(ev) {

        let { token } = await this.props.stripe.createToken({ name: "Name" });
        let data = { tokenId: token.id };

        helpers.post({

            url: 'api/StripePayment/DoPayment',

            data: data,

            notifyError: true,

            onSuccess: (response) => {

                notify("Purchasing succeed.");
            }
        });
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