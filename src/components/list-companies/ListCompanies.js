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
     <header>Total of {this.props.totalCompanies} companies</header>
        <ul> 
          {this.listFunction()}
        </ul>
      </section> 
     );
  }
}
 
export default ListCompanies;

