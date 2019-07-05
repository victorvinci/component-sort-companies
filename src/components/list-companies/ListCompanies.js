import React, {  Component } from 'react'

import CompanyCard from '../company-card/CompanyCard'

class ListCompanies  extends Component {

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
        <ul> 
          {this.listFunction()}
        </ul>
        <footer>{this.props.totalCompanies}</footer>
      </section> 
     );
  }
}
 
export default ListCompanies;

