import { Component } from 'react'
import userService from '../services/user.service'

export class SignupPage extends Component {
  state = {
    userName: '',
  }

  handleChange = async ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value || '' : target.value
    this.setState({ [field]: value })
  }
  
  signup = async (ev) => {
    ev.preventDefault()
    console.log('username signup cmp:', this.state.userName)
    const userName = userService.signup(this.state.userName)
    await this.setState({ userName })
    this.props.history.push('/')
  }

  render() {
    return (
      <form onSubmit={this.signup}>
        <input onChange={this.handleChange} type="text" placeholder="User Name" id="userName" name="userName" value={this.state.userName} />
        <button>submit</button>
      </form>
    )
  }
}
