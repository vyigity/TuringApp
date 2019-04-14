"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var ej2_data_1 = require("@syncfusion/ej2-data");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("../App.css");
var ej2_base_1 = require("@syncfusion/ej2-base");
var react_bootstrap_1 = require("react-bootstrap");
ej2_base_1.enableRipple(true);
var deneme = /** @class */ (function (_super) {
    __extends(deneme, _super);
    function deneme(props) {
        var _this = _super.call(this, props) || this;
        _this.setGridDataManager = function () {
            _this.data = new ej2_data_1.DataManager({
                url: '/odata/Products',
                adaptor: new ej2_data_1.ODataV4Adaptor
            });
        };
        _this.fetchDepartments = function () {
            //fetch('/api/SampleData/GetDepartments')
            //    .then(response => response.json())
            //    .then(data => this.setState({ departments: data }));
            fetch('/odata/Departments')
                .then(function (response) { return response.json(); })
                .then(function (data) { return _this.setState({ departments: data.value }); });
        };
        _this.fetchCategories = function (departmentId) {
            //fetch('/odata/Product/GetCategories/?departmentId=' + departmentId)
            //    .then(response => response.json())
            //    .then(data => this.setState({ categories: data.value }));
            fetch('/odata/Products?departmentId=' + departmentId)
                .then(function (response) { return response.json(); })
                .then(function (data) { return _this.setState({ categories: data.value }); });
        };
        _this.pageOptions = { pageSize: 8, pageSizes: true };
        _this.settings = 'Content';
        _this.template = _this.gridTemplate;
        _this.template2 = _this.gridTemplate2;
        _this.template3 = _this.gridTemplate3;
        _this.template4 = _this.gridTemplate4;
        _this.fields = { text: 'name', value: 'departmentId' };
        _this.fields2 = { text: 'name', value: 'categoryId' };
        _this.toolbarOptions = ['Search'];
        _this.searchOptions = { fields: ['name', 'description'], operator: 'contains', key: 'productId', ignoreCase: true };
        _this.state = {
            selectedDepartment: null,
            selectedCategory: null,
            departments: [],
            categories: []
        };
        _this.onDepartmentsChange = _this.onDepartmentsChange.bind(_this);
        _this.onCategoriesChange = _this.onCategoriesChange.bind(_this);
        return _this;
    }
    deneme.prototype.componentDidMount = function () {
        this.fetchDepartments();
        this.setGridDataManager();
    };
    deneme.prototype.gridTemplate = function (props) {
        var src = "MyImages/" + props.image;
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, width: 100, height: 100 })));
    };
    deneme.prototype.gridTemplate2 = function (props) {
        var src = "MyImages/" + props.image2;
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, width: 100, height: 100 })));
    };
    deneme.prototype.gridTemplate3 = function (props) {
        var src = "MyImages/" + props.thumbnail;
        return (React.createElement("div", { className: 'image' },
            React.createElement("img", { src: src, width: 100, height: 100 })));
    };
    deneme.prototype.gridTemplate4 = function (props) {
        if (props.discountedPrice == 0) {
            return React.createElement("div", null);
        }
        else
            return React.createElement("div", null, props.discountedPrice);
    };
    deneme.prototype.onDepartmentsChange = function (args) {
        if (args.value != null)
            this.grid.query = new ej2_data_1.Query().addParams('selectedDepartment', args.value);
        this.setState({ selectedDepartment: args.value });
        this.setState({ selectedCategory: null });
        this.fetchCategories(args.value);
        this.grid.refresh();
    };
    deneme.prototype.onCategoriesChange = function (args) {
        if (this.state.selectedDepartment != null)
            this.grid.query = new ej2_data_1.Query().addParams('selectedDepartment', this.state.selectedDepartment);
        if (this.listObj2.value != null)
            this.grid.query.addParams('selectedCategory', args.value);
        this.setState({ selectedCategory: args.value });
        this.grid.refresh();
    };
    deneme.prototype.render = function () {
        var _this = this;
        return (React.createElement(React.Fragment, null,
            React.createElement(react_bootstrap_1.Grid, { fluid: true },
                React.createElement(react_bootstrap_1.Row, null,
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "cbDepartments", dataSource: this.state.departments, ref: function (combobox) { _this.listObj = combobox; }, fields: this.fields, change: this.onDepartmentsChange, placeholder: "Select a department", popupHeight: "250px", showClearButton: true })),
                React.createElement(react_bootstrap_1.Row, null,
                    React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "cbCategories", dataSource: this.state.categories, ref: function (combobox) { _this.listObj2 = combobox; }, fields: this.fields2, change: this.onCategoriesChange, placeholder: "Select a category", popupHeight: "250px", showClearButton: true, value: this.state.selectedCategory })),
                React.createElement(react_bootstrap_1.Row, null,
                    React.createElement(ej2_react_grids_1.GridComponent, { ref: function (g) { return _this.grid = g; }, toolbar: this.toolbarOptions, allowPaging: true, pageSettings: this.pageOptions, allowTextWrap: true, textWrapSettings: this.settings, dataSource: this.data, allowSorting: true },
                        React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'productId', headerText: 'productId' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'name', headerText: 'Name', allowSorting: true }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'description', headerText: 'Description' }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'price', headerText: 'Price', allowSorting: true }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'discountedPrice', headerText: 'Discounted Price', template: this.template4 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'image', headerText: '', template: this.template }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'image2', headerText: '', template: this.template2 }),
                            React.createElement(ej2_react_grids_1.ColumnDirective, { field: 'thumbnail', headerText: '', template: this.template3 })),
                        React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.Toolbar, ej2_react_grids_1.Page] }))))));
    };
    return deneme;
}(React.Component));
exports.deneme = deneme;
//# sourceMappingURL=deneme.js.map