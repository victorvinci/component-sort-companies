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
      sortName: false,
      sortRelevance: false,
      sortYear: false
     }
  }

  componentDidMount() {
    // get API data
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

    if (this.state.sortName === false){
      return this.setState({companiesData: namesAtoZ, sortName: true})
    } else {
      return this.setState({companiesData: namesAtoZ.reverse(), sortName: false})
    }
  }

  sortRelevance = () => {
    let relevance0to1 = this.state.companiesData.sort(function(a, b){
      if(a.relevance < b.relevance) { return 1; }
      if(a.relevance > b.relevance) { return -1; }
      return 0;
    });

    if (this.state.sortRelevance === false){
      return this.setState({companiesData: relevance0to1, sortRelevance: true})
    } else {
      return this.setState({companiesData: relevance0to1.reverse(), sortRelevance: false})
    }
  }

  sortYear = () => {
    let year0to1 = this.state.companiesData.sort(function(a, b){
      if(a.yearFounded < b.yearFounded) { return 1; }
      if(a.yearFounded > b.yearFounded) { return -1; }
      return 0;
    });

    if (this.state.sortYear === false){
      return this.setState({companiesData: year0to1, sortYear: true})
    } else {
      return this.setState({companiesData: year0to1.reverse(), sortYear: false})
    }
  }

  render() { 
    // console.log(this.state.companiesData)
    return (
      <article>
        <header><h1>Find the best company for you!</h1></header>
        <nav className="buttons-container">
          <button type="button" onClick={this.sortName}>Sort by Name</button>
          <button type="button" onClick={this.sortRelevance}>Sort by Relevance</button>
          <button type="button" onClick={this.sortYear}>Sort by Year</button>
        </nav>
        <ListCompanies 
          companiesData={this.state.companiesData} 
          totalCompanies={this.state.totalCompanies} 
          sortName={this.sortName} 
          sortRelevance={this.sortRelevance} 
          sortYear={this.sortYear}>
        </ListCompanies>
      </article>

    );
  }
}
 
export default App;

