import { Component } from 'react'

export class ContactFilter extends Component {
  state = {
    term: this.props.filterBy?.term || '',
  }

  hangleChange = ({ target }) => {
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
        <i className="fa-solid fa-magnifying-glass filter"></i>
        <input type="text" className="filter__search" onChange={this.hangleChange} name="term" value={term} placeholder="Search" />
      </section>
    )
  }
}
