import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem } from 't63'
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
					<a className="f6 link grow ph3 pv2 mb2 dib white bg-black">Show</a>
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

	login() {
		this.props.auth.login()
	}

	logout() {
		this.props.auth.logout(this.props)
	}
	render() {
		const props = this.props
		const { isAuthenticated } = props.auth
		return (
			<div>
				{isAuthenticated() && (
					<div className="flex flex-column justify-between vh-100 w-100 avenir">
						<header className="flex flex-row justify-between items-center h3 pb2">
							<div className="ml2">
								<a
									className="f6 link grow ba pa3 pv2 mb2 dib black"
									onClick={this.logout.bind(this)}
								>
									logout
								</a>
							</div>
							<div className="pt3 center">
								<img
									src="https://www.citibot.io/img/citibot-logo.svg"
									alt="citibot"
									width="300"
								/>
							</div>
							<div className="mr2">
								<Link to="/cities/new">
									<a className="f6 link grow ba pa3 pv2 mb2 dib black">new</a>
								</Link>
							</div>
						</header>
						<main className="vh-100 overflow-scroll">
							<List className="bg-light-gray pa2">{map(li, props.cities)}</List>
						</main>
					</div>
				)}
				{!isAuthenticated() && (
					<div className="mw7 center ph5-ns tc br2 pv3 avenir">
						<div className="center">
							<img
								src="https://www.citibot.io/img/citibot-logo.svg"
								alt="citibot"
								width="300"
							/>
						</div>
						<h4 className="fw6 f3 f2-ns lh-title mt0 mb3 pt2">
							You are not logged in, Please login to continue.
						</h4>
						<a
							style={{ cursor: 'pointer' }}
							className="f6 link grow ba pa3 pv2 mb2 dib black"
							onClick={this.login.bind(this)}
						>
							Log In
						</a>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		cities: state.cities
	}
}

const connector = connect(mapStateToProps)

export default connector(ListCities)
