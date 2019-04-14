//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import {GridComponent, Inject, ColumnsDirective, Sort, WrapMode, Page, PageSettingsModel,Toolbar,ToolbarItems, SearchSettingsModel, ColumnDirective } from '@syncfusion/ej2-react-grids';
//import { DataManager,Query, WebApiAdaptor, ODataV4Adaptor } from '@syncfusion/ej2-data';
//import { ComboBoxComponent, ChangeEventArgs } from '@syncfusion/ej2-react-dropdowns';


//import '../App.css';

//import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
//import { enableRipple, debounce } from '@syncfusion/ej2-base';
//import { Col, Grid, Row } from 'react-bootstrap';
//import { number } from 'prop-types';

//enableRipple(true);

//interface IState {

//    selectedDepartment: any;
//    selectedCategory: any;
//    departments: any;
//    categories: any;
//}

//interface IProps { }

//export class deneme extends React.Component<IProps, IState> {

//    constructor(props) {
//        super(props);

//        this.state = {

//            selectedDepartment: null,
//            selectedCategory : null,
//            departments: [],
//            categories: []
//        };

//        this.onDepartmentsChange = this.onDepartmentsChange.bind(this);
//        this.onCategoriesChange = this.onCategoriesChange.bind(this);

//    }
    
//    private grid: GridComponent;
//    private listObj: ComboBoxComponent;
//    private listObj2: ComboBoxComponent;
//    public data: DataManager;

//    componentDidMount() {

//        this.fetchDepartments();
//        this.setGridDataManager();       
//    }

//    setGridDataManager = () => {

//        this.data = new DataManager({
//            url: '/odata/Products',
//            adaptor: new ODataV4Adaptor
//        });
//    }

//    fetchDepartments = () => {

//        //fetch('/api/SampleData/GetDepartments')
//        //    .then(response => response.json())
//        //    .then(data => this.setState({ departments: data }));

//        fetch('/odata/Departments')
//            .then(response => response.json())
//            .then(data => this.setState({ departments: data.value }));
//    }

//    fetchCategories = (departmentId: any) => {

//        //fetch('/odata/Product/GetCategories/?departmentId=' + departmentId)
//        //    .then(response => response.json())
//        //    .then(data => this.setState({ categories: data.value }));

//        fetch('/odata/Products?departmentId=' + departmentId)
//            .then(response => response.json())
//            .then(data => this.setState({ categories: data.value }));
//    }

//    public gridTemplate(props): any {

//        var src = "MyImages/" + props.image;
//        return (<div className='image'>
//            <img src={src} width={100} height={100} />
//        </div>);
//    }

//    public gridTemplate2(props): any {
//        var src = "MyImages/" + props.image2;
//        return (<div className='image'>
//            <img src={src} width={100} height={100} />
//        </div>);
//    }

//    public gridTemplate3(props): any {
//        var src = "MyImages/" + props.thumbnail;
//        return (<div className='image'>
//            <img src={src} width={100} height={100} />
//        </div>);
//    }

//    public gridTemplate4(props): any {

//        if (props.discountedPrice == 0) {
//            return <div></div>;
//        } else
//            return <div>{props.discountedPrice}</div>;
//    }

//    public pageOptions: PageSettingsModel = { pageSize: 8, pageSizes: true };

//    public settings: WrapMode = 'Content';
//    public template: any = this.gridTemplate;
//    public template2: any = this.gridTemplate2;
//    public template3: any = this.gridTemplate3;
//    public template4: any = this.gridTemplate4;

//    private fields: object = { text: 'name', value: 'departmentId' };
//    private fields2: object = { text: 'name', value: 'categoryId' };

//    public onDepartmentsChange(args: ChangeEventArgs): void {

//        if (args.value != null)
//            this.grid.query = new Query().addParams('selectedDepartment', args.value as string);

//        this.setState({ selectedDepartment: args.value });
//        this.setState({ selectedCategory: null });

//        this.fetchCategories(args.value);

//        this.grid.refresh();
//    }

//    public onCategoriesChange(args: ChangeEventArgs): void {

//        if (this.state.selectedDepartment != null)
//            this.grid.query = new Query().addParams('selectedDepartment', this.state.selectedDepartment);

//        if (this.listObj2.value != null)
//            this.grid.query.addParams('selectedCategory', args.value as string);

      
//        this.setState({ selectedCategory: args.value as string });
//        this.grid.refresh();
//    }

//    public toolbarOptions: ToolbarItems[] = ['Search'];
//    public searchOptions: SearchSettingsModel = { fields: ['name','description'], operator: 'contains', key: 'productId', ignoreCase: true };

//    render() {

//        return (

//            <React.Fragment>

//                <Grid fluid>

//                    <Row>
//                        <ComboBoxComponent id="cbDepartments" dataSource={this.state.departments} ref={(combobox) => { this.listObj = combobox }} fields={this.fields} change={this.onDepartmentsChange} placeholder="Select a department" popupHeight="250px" showClearButton={true} />
//                    </Row>

//                    <Row>
//                        <ComboBoxComponent id="cbCategories" dataSource={this.state.categories} ref={(combobox) => { this.listObj2 = combobox }} fields={this.fields2} change={this.onCategoriesChange} placeholder="Select a category" popupHeight="250px" showClearButton={true} value={this.state.selectedCategory} />
//                    </Row>

//                    <Row>
//                        <GridComponent ref={g => this.grid = g} toolbar={this.toolbarOptions} allowPaging={true} pageSettings={this.pageOptions} allowTextWrap={true} textWrapSettings={this.settings} dataSource={this.data} allowSorting={true}>
//                            <ColumnsDirective>
//                                <ColumnDirective field='productId' headerText='productId'></ColumnDirective>
//                                <ColumnDirective field='name' headerText='Name' allowSorting={true}></ColumnDirective>
//                                <ColumnDirective field='description' headerText='Description'></ColumnDirective>
//                                <ColumnDirective field='price' headerText='Price' allowSorting={true}></ColumnDirective>
//                                <ColumnDirective field='discountedPrice' headerText='Discounted Price' template={this.template4}></ColumnDirective>
//                                <ColumnDirective field='image' headerText='' template={this.template}></ColumnDirective>
//                                <ColumnDirective field='image2' headerText='' template={this.template2}></ColumnDirective>
//                                <ColumnDirective field='thumbnail' headerText='' template={this.template3}></ColumnDirective>
//                            </ColumnsDirective>
//                            <Inject services={[Toolbar, Page]} />
//                        </GridComponent>
//                    </Row>
//                </Grid>

//            </React.Fragment>
//        );
//    }
//}
    
    
    
