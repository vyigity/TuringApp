import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import notify from 'devextreme/ui/notify';
import { func } from 'prop-types';
import Cookies from 'js-cookie';

const helpers = {

    get: function (confObject) {

        fetch(confObject.url, {

            headers: {

                'credentials': 'include',
            },
            body: JSON.stringify(confObject.data)
        })
            .then(response => response.json())
            .then(data => {

                callSuccessFunc(confObject, data);
            })
            .catch(reason => {

                callErrorFunc(confObject, reason);
            });
    },

    post: function (confObject) {

        var header = {

            'credentials': 'include',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': Cookies.get("CSRF-TOKEN")
        };

        fetch(confObject.url, {

            headers: header,
            method: "POST",
            body: JSON.stringify(confObject.data)
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                callSuccessFunc(confObject, data);
                hasNotifySuccess(confObject);

            }).catch(function (reason) {

                callErrorFunc(confObject, reason);
                hasNotifyError(confObject);
            });
    }
}

function callSuccessFunc(confObject, data) {

    if (confObject.onSuccess !== undefined) {

        confObject.onSuccess(data);
    }
}

function callErrorFunc(confObject, reason) {

    if (confObject.onError !== undefined) {

        confObject.onError(reason);
    }
}

function hasNotifySuccess(confObject) {

    if (confObject.notifySuccess !== undefined && confObject.notifySuccess) {

        if (confObject.successMessage !== undefined)

            notify(confObject.successMessage);

        else {

            notify("Operation succeed.");
        }
    }
}

function hasNotifyError(confObject) {

    if (confObject.notifyError !== undefined && confObject.notifyError) {

        if (confObject.errorMessage !== undefined)

            notify(confObject.errorMessage);

        else {

            notify("Operation failed.");
        }
    }
}

export default helpers;
