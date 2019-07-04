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
     <div>
        <button type="button" onClick={this.props.sortName}>Sort by Name</button>
        <button type="button"></button>
        <button type="button"></button>
        <ul> 
          {this.listFunction()}
        </ul>
        <div>{this.props.totalCompanies}</div>
      </div> 
     );
  }
}
 
export default ListCompanies;

