import React, { Component } from 'react';
// import logo from '../../assets/logos/logo.svg';

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

  // fecth API and update state
  componentDidMount() {
    // get API data
    fetch('https://www.mocky.io/v2/5d1a17de2f00002c00fd748e')
    .then(results => {
      return results.json();
    }).then(data => {
      return this.setState({companiesData: data.items, totalCompanies: data.total})
    })
  }

  // remove clicked class if it already exist
  removeClickedClass = () => {
    let clickedClass = document.querySelector(".clicked")
    if (clickedClass ) {
      clickedClass.classList.remove('clicked')
    }
  }

  // add clicked class to the clicked page number and update state
  addClickedClass = (event) => {
    this.removeClickedClass();
    event.target.classList.add("clicked")

    this.setState({
      currentPage: Number(event.target.id)
    });
  }

  // function called on click to sort the list by name from AtoZ or ZtoA
  sortName = () => {
    this.removeClickedClass();
    document.getElementById('1').classList.add('clicked')
    let namesAtoZ = this.state.companiesData.sort(function(a, b){
      if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
      if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
      return 0;
    });
    if (this.state.sortName === false){
      return this.setState({companiesData: namesAtoZ, sortName: true, currentPage: 1})
    } else {
      return this.setState({companiesData: namesAtoZ.reverse(), sortName: false, currentPage: 1})
    }
  }

  // function called on click to sort the list by relevance from 0to1 or 1to0
  sortRelevance = () => {
    this.removeClickedClass();
    document.getElementById('1').classList.add('clicked')
    let relevance0to1 = this.state.companiesData.sort(function(a, b){
      if(a.relevance < b.relevance) { return 1; }
      if(a.relevance > b.relevance) { return -1; }
      return 0;
    });

    if (this.state.sortRelevance === false){
      return this.setState({companiesData: relevance0to1, sortRelevance: true, currentPage: 1})
    } else {
      return this.setState({companiesData: relevance0to1.reverse(), sortRelevance: false, currentPage: 1})
    }
  }

  // function called on click to sort the list by year from 0to1 or 1to0
  sortYear = () => {
    this.removeClickedClass();
    document.getElementById('1').classList.add('clicked')
    let year0to1 = this.state.companiesData.sort(function(a, b){
      if(a.yearFounded < b.yearFounded) { return 1; }
      if(a.yearFounded > b.yearFounded) { return -1; }
      return 0;
    });

    if (this.state.sortYear === false){
      return this.setState({companiesData: year0to1, sortYear: true, currentPage: 1})
    } else {
      return this.setState({companiesData: year0to1.reverse(), sortYear: false, currentPage: 1})
    }
  }

  render() {

    // Logic for displaying current companies
    const indexOfLastCompany = this.state.currentPage * this.state.companiesPerPage;
    const indexOfFirstCompany = indexOfLastCompany - this.state.companiesPerPage;
    const currentCompanies = this.state.companiesData.slice(indexOfFirstCompany, indexOfLastCompany);

     // [page numer] create the page numbers that will appear in the bottom of the list
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(this.state.companiesData.length / this.state.companiesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.addClickedClass}
          className={`page-number`}
        >
          {number}
        </li>
      );
    });
    // end [page number]
    
    return (
      <article>
        <header><h1>Find the best company for you!</h1></header>
        <nav className="buttons-container">
          <button type="button" onClick={this.sortName}>Sort by Name<br/> {this.state.sortName ? ' ▲' : ' ▼'}</button>
          <button type="button" onClick={this.sortRelevance}>Sort by Relevance<br/> {this.state.sortRelevance ? ' ▲' : ' ▼'}</button>
          <button type="button" onClick={this.sortYear}>Sort by Year<br/> {this.state.sortYear ? ' ▲' : ' ▼'}</button>
        </nav>
        <ListCompanies 
          companiesData={currentCompanies} 
          totalCompanies={this.state.totalCompanies} 
        </ListCompanies>
        <footer>
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </footer>
      </article>

    );
  }
}
 
export default App;

