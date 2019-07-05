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
      sortYear: false,
      currentPage: 1,
      companiesPerPage: 3
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

  handleClick = (event) => {
    let pages = document.querySelectorAll('.page-numbers')

      if (event.target.id === "1") {
        event.target.classList.add("clicked")
      } if (event.target.id === "2") {
        event.target.classList.add("clicked")
      }
      
    this.setState({
      currentPage: Number(event.target.id)
    });
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

    const { companiesData, currentPage, companiesPerPage } = this.state;

        // Logic for displaying current todos
        const indexOfLastCompany = currentPage * companiesPerPage;
        const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
        const currentCompanies = companiesData.slice(indexOfFirstCompany, indexOfLastCompany);


        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(companiesData.length / companiesPerPage); i++) {
          pageNumbers.push(i);
        }


        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <li
              key={number}
              id={number}
              onClick={this.handleClick}
              className={`page-number`}
            >
              {number}
            </li>
          );
        });
    return (
      <article>
        <header><h1>Find the best company for you!</h1></header>
        <nav className="buttons-container">
          <button type="button" onClick={this.sortName}>Sort by Name</button>
          <button type="button" onClick={this.sortRelevance}>Sort by Relevance</button>
          <button type="button" onClick={this.sortYear}>Sort by Year</button>
        </nav>
        <ListCompanies 
          companiesData={currentCompanies} 
          totalCompanies={this.state.totalCompanies} 
          sortName={this.sortName} 
          sortRelevance={this.sortRelevance} 
          sortYear={this.sortYear}>
        </ListCompanies>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </article>

    );
  }
}
 
export default App;

