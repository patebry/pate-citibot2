import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NewCity from './pages/cities/form.js'
import ListCities from './pages/cities/list.js'
import ShowCity from './pages/cities/show'
import NumberSearch from './pages/search/numbers'
import EditCity from './pages/cities/edit'

const App = () => {
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route exact path="/cities" component={ListCities} />
					<Route exact path="/cities/new" component={NewCity} />
					<Route exact path="/cities/edit/:id" component={EditCity} />
					<Route exact path="/cities/:id" component={ShowCity} />
					<Route exact path="/numbers" component={NumberSearch} />
				</Switch>
			</div>
		</BrowserRouter>
	)
}

export default App
