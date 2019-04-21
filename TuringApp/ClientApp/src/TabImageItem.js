import React from 'react';

export default class ItemDetailModal extends React.PureComponent {

    render() {

        const item = this.props;

        return (

            <img src={"./MyImages/" + item.src} />
        );
    }
}