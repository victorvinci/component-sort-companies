import React, { Component } from 'react';
import logo from '../../assets/logos/logo.svg';
import './App.scss';

import ListCompanies from '../list-companies/ListCompanies'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      companiesData: [],
      totalCompanies: 0,
      clicked: false
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
    let namesAtoZ = this.state.companiesData.sort(function(a, b){
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    });

    if (this.state.clicked === false){
      return this.setState({companiesData: namesAtoZ, clicked: true})
    } else {
      return this.setState({companiesData: namesAtoZ.reverse(), clicked: false})
    }
  }

  sortRelevance = () => {
    let relevance0to1 = this.state.companiesData.sort(function(a, b){
      if(a.relevance < b.relevance) { return 1; }
      if(a.relevance > b.relevance) { return -1; }
      return 0;
    });

    if (this.state.clicked === false){
      return this.setState({companiesData: relevance0to1, clicked: true})
    } else {
      return this.setState({companiesData: relevance0to1.reverse(), clicked: false})
    }
  }

  sortYear = () => {
    let year0to1 = this.state.companiesData.sort(function(a, b){
      if(a.yearFounded < b.yearFounded) { return 1; }
      if(a.yearFounded > b.yearFounded) { return -1; }
      return 0;
    });

    if (this.state.clicked === false){
      return this.setState({companiesData: year0to1, clicked: true})
    } else {
      return this.setState({companiesData: year0to1.reverse(), clicked: false})
    }
  }

  render() { 
    // console.log(this.state.companiesData)
    return (
      <div>
        <ListCompanies companiesData={this.state.companiesData} totalCompanies={this.state.totalCompanies} sortName={this.sortName} sortRelevance={this.sortRelevance} sortYear={this.sortYear}></ListCompanies>
      </div>
    );
  }
}
 
export default App;

