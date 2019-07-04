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

  sortName = () => {
    let names = this.state.companiesData.sort(function(a, b){
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
  });
    return this.setState({companiesData: names})

  }

  render() { 
    // console.log(this.state.companiesData)
    return (
      <div>
        <ListCompanies companiesData={this.state.companiesData} totalCompanies={this.state.totalCompanies} sortName={this.sortName}></ListCompanies>
      </div>
    );
  }
}
 
export default App;

