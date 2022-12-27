import { Component } from 'react'

import searchIcon from '../assets/images/icons/search.png'

export class ContactFilter extends Component {
  state = {
    term: this.props.filterBy?.term || '',
  }

  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state)
    })
  }

  render() {
    const { term } = this.state
    return (
      <section className="filter">
        <input type="text" className="filter__search" onChange={this.handleChange} name="term" value={term} placeholder="Search" />
        <img src={searchIcon} alt="" className="filter__icon" />
      </section>
    )
  }
}
