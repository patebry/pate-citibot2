import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewCity from './pages/cities/form.js'
import ListCities from './pages/cities/list.js'
import ShowCity from './pages/cities/show'
import NumberSearch from './pages/search/numbers'
import EditCity from './pages/cities/edit'
import Login from './pages/login'
import history from './history'
import Callback from './pages/callback'

import Auth from './auth'
const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
	if (/access_token|id_token|error/.test(nextState.location.hash)) {
		auth.handleAuthentication()
	}
}

const App = () => {
	return (
		<BrowserRouter history={history}>
			<div>
				<Switch>
					<Route
						exact
						path="/"
						render={props => <Login auth={auth} {...props} />}
					/>
					<Route
						exact
						path="/cities"
						render={props => <ListCities auth={auth} {...props} />}
					/>
					<Route
						path="/cities/new"
						render={props => <NewCity auth={auth} {...props} />}
					/>
					<Route
						path="/cities/edit/:id"
						render={props => <EditCity auth={auth} {...props} />}
					/>
					<Route
						path="/cities/:id"
						render={props => <ShowCity auth={auth} {...props} />}
					/>
					<Route
						path="/numbers"
						render={props => <NumberSearch auth={auth} {...props} />}
					/>
					<Route
						path="/callback"
						render={props => {
							handleAuthentication(props)
							return <Callback {...props} />
						}}
					/>
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
