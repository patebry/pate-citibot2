import React from 'react'
import { Link } from 'react-router-dom'
import { TextField } from 't63'
import { connect } from 'react-redux'
import R from 'ramda'
import { createCity } from '../../db.js'
import { SET_CITY_X } from '../../constants'
const { toUpper } = R

class AddCity extends React.Component {
	login() {
		this.props.auth.login()
	}

	render() {
		const props = this.props
		const { isAuthenticated } = props.auth
		return (
			<div>
				{isAuthenticated() && (
					<div className="flex flex-column justify-start avenir w-100">
						<header className="flex flex-row justify-between items-center h3 pb2">
							<div className="pa2">
								<Link to="/cities">
									<a className="f6 grow link ba ph3 pv2 mb2 dib black">back</a>
								</Link>
							</div>
							<div className="pt3">
								<img
									src="https://www.citibot.io/img/citibot-logo.svg"
									alt="citibot"
									width="300"
								/>
							</div>
							<div className="mr2">
								<Link to={'/cities'}>
									<a
										className="f6 link grow ba ph3 pv2 mb2 dib black"
										onClick={props.submitCity(props._id)}
									>
										save
									</a>
								</Link>
							</div>
						</header>
						<main className="overflow-scroll">
							<h2 className="f4 f2-ns">Add City</h2>
							<form className="ph2">
								<TextField
									value={props.name}
									onChange={props.handleName}
									name="City Name"
								/>
								<TextField
									value={props.description}
									onChange={props.handleDescription}
									name="Description"
								/>
								<TextField
									value={props.content}
									onChange={props.handleContent}
									name="Greeting"
								/>
								<TextField
									value={props.sites}
									onChange={props.handleSites}
									name="Website to search"
								/>
								<TextField
									value={props.location.search.substring(
										props.location.search.length - 11
									)}
									onChange={props.handleId(
										props.location.search.substring(
											props.location.search.length - 11
										)
									)}
									name="Phone Number (use search button)"
								/>
								<Link to="/numbers">
									<a className="f6 link grow ba ph3 pv2 mb2 dib white bg-black">
										Search
									</a>
								</Link>
								<Link to="/cities">
									<a
										className="w-100 f6 link grow ba ph3 pv2 mb2 dib tc black"
										onClick={props.submitCity(props._id)}
									>
										Save City
									</a>
								</Link>
							</form>
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

function mapActionsToProps(dispatch) {
	const doDispatch = (field, value) => {
		dispatch({
			type: SET_CITY_X + toUpper(field),
			payload: value
		})
	}
	return {
		dispatch,
		submitCity: id => {
			return e => dispatch(createCity)
		},
		handleName: e => doDispatch('NAME', e.target.value),
		handleId: e => doDispatch('_ID', e),
		handleSites: e => doDispatch('SITES', e.target.value),
		handleDescription: e => doDispatch('DESCRIPTION', e.target.value),
		handleContent: e => doDispatch('CONTENT', e.target.value)
	}
}

function mapStateToProps(state) {
	return {
		name: state.city.name,
		_id: state.city._id,
		sites: state.city.sites,
		description: state.city.description,
		content: state.city.content
	}
}
const connector = connect(mapStateToProps, mapActionsToProps)
export default connector(AddCity)
