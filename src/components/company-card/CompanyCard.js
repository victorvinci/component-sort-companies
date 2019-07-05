import React, {  Component } from 'react'

class CompanyCard  extends Component {

  
  render() { 
    return (
      <li>
        <img src={`${this.props.company.logo}`} alt="logo"></img>
        <h2>{this.props.company.name}, founded in {this.props.company.yearFounded}</h2>
        <p>{this.props.company.description}</p>
        <aside>{this.props.company.sectors.map(sector => {
          return <p>{sector}</p>
        })}</aside>
      </li>

     );
  }
}
 
export default CompanyCard;

