import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { deneme2 } from './deneme2';

import '../node_modules/devextreme/dist/css/dx.common.css';
import '../node_modules/devextreme/dist/css/dx.material.blue.light.css';

//<Route path='/deneme' component={deneme2} />

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
            <Route exact path='/' component={deneme2} />        
      </Layout>
    );
  }
}
