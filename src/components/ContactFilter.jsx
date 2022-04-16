import { Component } from 'react'

export class ContactFilter extends Component {
  state = {
    term: '',
  }

  hangleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState({ [field]: value }, () => {
      this.props.onChangeFilter(this.state)
    })
  }

  render() {
    const { txt } = this.state
    return (
      <section className="filter">
        <i className="fa-solid fa-magnifying-glass filter"></i>
        <input type="text" className="filter__search" onChange={this.hangleChange} name="term" value={txt} placeholder="Search" />
      </section>
    )
  }
}
