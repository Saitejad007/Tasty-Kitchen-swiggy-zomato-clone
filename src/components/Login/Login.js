import {Component} from 'react'
import './index.css'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    username: '',
    password: '',
    formError: false,
    errorMsg: '',
  }

  submitFrom = async e => {
    const {history} = this.props
    const {username, password} = this.state
    e.preventDefault()
    const loginUrl = 'https://apis.ccbp.in/login'

    const response = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify({username, password}),
    })
    const jsonData = await response.json()
    console.log(jsonData)

    if (response.ok) {
      Cookie.set('jwt_token', jsonData.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({formError: true, errorMsg: jsonData.error_msg})
    }
  }

  getUsername = e => {
    this.setState({username: e.target.value})
  }

  getPassword = e => {
    this.setState({password: e.target.value})
  }

  render() {
    const {username, password, formError, errorMsg} = this.state
    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dzdh52ops/image/upload/v1669212424/Tasty%20Kitchen/Mobile%20View%20Resource/Login-img_gxccqk.png"
            alt="website logo"
            className="website-logo"
          />
          <p className="login">Login</p>
        </div>

        <form className="form" onSubmit={this.submitFrom}>
          <div className="input-field">
            <label htmlFor="userName" className="label">
              Username
            </label>
            <input
              type="text"
              id="userName"
              value={username}
              onChange={this.getUsername}
              className="input"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={this.getPassword}
            />
            {formError ? <p className="error-msg">{errorMsg}</p> : ''}
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
