import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AdminDashboard from './containers/AdminDashboard'
import Home from "./containers/Home"
import Login from "./containers/Login"
import Signup from "./containers/Signup"
import Layout from './hocs/Layout'
import './index.css'

function App() {
    return (
        <Router>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/admin-dashboard" component={AdminDashboard} />
                </Switch>
            </Layout>
        </Router>
    )
}

export default App
