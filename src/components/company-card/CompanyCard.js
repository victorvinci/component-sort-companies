import React, {  Component } from 'react'

class CompanyCard  extends Component {

  
  render() { 
    return (
      <li> 
        {this.props.company.name}
      </li>
     );
  }
}
 
export default CompanyCard;

