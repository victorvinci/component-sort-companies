import React, { Component } from 'react';
import logo from '../../assets/logos/logo.svg';
import './App.scss';

import ListCompanies from '../list-companies/ListCompanies'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      companiesData: [],
      totalCompanies: 0
     }
  }

  componentDidMount() {
    fetch('http://www.mocky.io/v2/5d1a17de2f00002c00fd748e')
    .then(results => {
      return results.json();
    }).then(data => {
      return this.setState({companiesData: data.items, totalCompanies: data.total})
    })
  }

  render() { 
    // console.log(this.state.companiesData)
    return (
      <div>
        <ListCompanies companiesData={this.state.companiesData} totalCompanies={this.state.totalCompanies}></ListCompanies>
      </div>
    );
  }
}
 
export default App;

