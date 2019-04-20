import React, { Component } from 'react';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, Summary, TotalItem } from 'devextreme-react/data-grid';

import { ItemDetailModal } from './ItemDetailModal';

import { helpers, shoppingHelpers } from './Util';

export default class ShoppingCart extends Component {

    constructor(props) {

        super(props);

        this.state = {

            itemDetailShow: false,
            selectedRowData: null,
            attributes: null,

            dataSourceOptions: {
                store: {
                    type: 'odata',
                    url: "/odata/ShoppingCart?$expand=Product&$filter=CartId eq '" + shoppingHelpers.getShoppingCartId() + "'",
                    version: 4
                },
            }
        }
    }

    componentDidMount() {

    }

    onSelectionChanged = (selectedRowData) => {

        if (selectedRowData.selectedRowKeys.length > 0) {

            helpers.get({

                url: "/odata/Products?$filter=ProductId eq " + selectedRowData.selectedRowsData[0].ProductId,

                onSuccess: (data) => {

                    this.setState({

                        selectedRowData: data.value[0],
                        itemDetailShow: true,
                        attributes: selectedRowData.selectedRowsData[0].Attributes
                    });
                }
            });
        }
    }

    modalClose = () => {

        this.setState({

            itemDetailShow: false,
        });
    }

    render() {

        let detailModal = <ItemDetailModal show={this.state.itemDetailShow} onHide={this.modalClose} masterdata={this.state.selectedRowData} attributes={this.state.attributes} readOnly={true} />;

        if (this.state.selectedRowData == null)
            detailModal = null;


        return (

            <React.Fragment>

                <DataGrid
                    dataSource={this.state.dataSourceOptions}
                    showBorders={true}
                    selection={{ mode: "single" }}
                    onSelectionChanged={this.onSelectionChanged}>

                    <FilterRow visible={true}
                    //applyFilter={this.state.currentFilter}
                    />
                    <HeaderFilter visible={true} />
                    <SearchPanel visible={true}
                        width={240}
                        placeholder={'Search...'} />

                    <Column dataField={'ProductId'} />

                    <Column
                        dataField={'Product.Name'}
                        dataType={'string'}
                    />

                    <Column
                        dataField={'Attributes'}
                        caption={'Attributes'}
                        dataType={'string'}
                        visible={false}
                        calculateCellValue={this.calculateCellValue}
                    />
                    <Column
                        dataField={'Quantity'}
                        caption={'Quantity'}
                        dataType={'number'}
                    />
                    <Column
                        dataField={'Product.Price'}
                        caption={'Price'}
                        dataType={'number'}
                    />

                    <Column
                        dataField={'Product.DiscountedPrice'}
                        caption={'DiscountedPrice'}
                        dataType={'number'}
                    />

                    <Summary>

                        <TotalItem
                            column={'Product.Price'}
                            summaryType={'sum'}/>
                        <TotalItem
                            column={'Product.DiscountedPrice'}
                            summaryType={'sum'} />

                    </Summary>

                </DataGrid>

                {detailModal}

            </React.Fragment>
        )
    }
}