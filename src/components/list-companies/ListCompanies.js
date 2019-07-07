import React, {  Component } from 'react'

import CompanyCard from '../company-card/CompanyCard'

class ListCompanies  extends Component {
  // Iterate through companies to render each in the CompanyCard component
  listFunction = () => {
  return this.props.companiesData.map((company => {
      return (
        <CompanyCard key={company._id} company={company}></CompanyCard>
      )
    }))
  }
  
  render() { 
    return (
     <section className="list-container">
     <header id="total-companies">Total of {this.props.totalCompanies} companies</header>
        <ul id="list-total-companies"> 
          {this.listFunction()}
        </ul>
      </section> 
     );
  }
}
 
export default ListCompanies;

