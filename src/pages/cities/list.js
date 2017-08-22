import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, Button } from 't63'
import { connect } from 'react-redux'
import { map } from 'ramda'
import { listCities } from '../../db.js'
import { CLEAR_CITY } from '../../constants.js'

const li = city => {
	return (
		<ListItem
			key={city._id}
			className="bn"
			right={
				<Link to={`/cities/${city._id}`}>
					<a className="f6 link dim ph3 pv2 mb2 dib white bg-black">Show</a>
				</Link>
			}
		>
			<a className="dt w-100 pb2 mt2">
				<div className="dtc v-top pl2">
					<h1 className="f6 f5-ns fw6 mv0">{city.name}</h1>
					<h2 className="f6 fw4 mt2 mb0 black-60">{city._id}</h2>
				</div>
			</a>
		</ListItem>
	)
}

class ListCities extends React.Component {
	componentDidMount() {
		this.props.dispatch(listCities)
		this.props.dispatch({ type: CLEAR_CITY })
	}
	render() {
		return (
			<div className="flex flex-column justify-between vh-100 w-100 avenir">
				<header className="flex flex-row justify-between items-center h3 pb2">
					<div className="pt3 center">
						<img
							src="http://www.citibot.io/img/CititBotLogo-Final.png"
							alt="citibot"
							width="300"
						/>
					</div>
					<div className="mr2">
						<Link to="/cities/new">
							<a className="f6 link dim ba pa3 pv2 mb2 dib black">
								new
							</a>
						</Link>
					</div>
				</header>
				<main className="vh-100 overflow-scroll">

					<List className="bg-light-gray pa2">
						{map(li, this.props.cities)}
					</List>

				</main>
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log('state', state)
	return {
		cities: state.cities
	}
}

const connector = connect(mapStateToProps)

export default connector(ListCities)
