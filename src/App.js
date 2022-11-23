import './App.css'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </div>
)

export default App
