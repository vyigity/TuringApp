import React from 'react';

import 'devextreme/data/odata/store';
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel } from 'devextreme-react/data-grid';
import { CheckBox, SelectBox, NumberBox, Form, Item } from 'devextreme-react';

import { ItemDetailModal } from './ItemDetailModal';

export class Products extends React.Component {

    constructor(props) {

        super(props);

        this.state = {

            itemDetailShow: false,
            selectedDepartment: null,
            selectedCategory: null,
            departments: [],
            categories: [],
            selectedRowData: null,

            dataSourceOptions: {
                store: {
                    type: 'odata',
                    url: '/odata/Products',
                    version: 4
                },
            }
        }

        this.fetchDepartments = this.fetchDepartments.bind(this);
    }

    componentDidMount() {

        this.fetchDepartments();
    }

    fetchDepartments = () => {

        fetch('/odata/Departments')
            .then(response => response.json())
            .then(data => this.setState({ departments: data.value }));
    }

    fetchCategories = (departmentId) => {

        fetch("/odata/Categories?$filter=departmentId eq " + departmentId)
            .then(response => response.json())
            .then(data => this.setState({ categories: data.value }));
    }

    onDepartmentsChange = (args) => {

        this.setState({ selectedDepartment: args.value });
        this.setState({ selectedCategory: null });

        let dataSourceOptions = {
            store: {
                type: 'odata',
                url: "/odata/GetProductByFilter",
                version: 4
            }
        };

        if (args.value != null) {

            this.fetchCategories(args.value);
            dataSourceOptions.store.url += "?selectedDepartment=" + args.value;
        }
        else {

            this.setState({ categories: [] });
        }

        this.setState({ dataSourceOptions: dataSourceOptions });
    }

    onCategoriesChange = (args) => {

        this.setState({ selectedCategory: args.value });

        let dataSourceOptions = {
            store: {
                type: 'odata',
                url: "/odata/GetProductByFilter?selectedDepartment=" + this.state.selectedDepartment,
                version: 4
            }
        };

        if (args.value != null) {

            dataSourceOptions.store.url += "&selectedCategoryId=" + args.value;
        }

        this.setState({ dataSourceOptions: dataSourceOptions });
    };

    gridCellTemplate = (data) => {

        var src = "MyImages/" + data.value;

        return (<div className='image'>
            <img src={src} width={100} height={100} />
        </div>);
    }

    onSelectionChanged = (selectedRowData) => {

        if (selectedRowData.selectedRowKeys.length > 0) {
            this.setState({

                selectedRowData: selectedRowData.selectedRowsData[0],
                itemDetailShow: true,
            });
        }
    }

    modalClose = () => {

        this.setState({

            itemDetailShow: false,
        });
    }

    render() {

        let detailModal = <ItemDetailModal show={this.state.itemDetailShow} onHide={this.modalClose} masterData={this.state.selectedRowData} />;

        if (this.state.selectedRowData == null)
            detailModal = null;

        return (

            <React.Fragment>

                <div className={'dx-field'}>
                    <SelectBox items={this.state.departments}
                        valueExpr="DepartmentId"
                        displayExpr="Name"
                        placeholder={'Choose depertment'}
                        showClearButton={true} onValueChanged={this.onDepartmentsChange} />
                </div>

                <div className={'dx-field'}>
                    <SelectBox items={this.state.categories}
                        valueExpr="CategoryId"
                        displayExpr="Name"
                        placeholder={'Choose category'}
                        showClearButton={true} onValueChanged={this.onCategoriesChange} />
                </div>

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
                        dataField={'Name'}
                        dataType={'string'}
                        width={250}
                    />
                    <Column
                        dataField={'Description'}
                        caption={'Description'}
                        dataType={'string'}
                    />
                    <Column
                        dataField={'Price'}
                        caption={'Sale Price'}
                        dataType={'number'}
                    />
                    <Column
                        dataField={'DiscountedPrice'}
                        caption={'Retail Price'}
                        dataType={'number'}
                    />

                    <Column
                        dataField={'Thumbnail'}
                        dataType={'number'}
                        cellRender={this.gridCellTemplate}
                    />

                </DataGrid>

                {detailModal}

            </React.Fragment>
        );
    }
}