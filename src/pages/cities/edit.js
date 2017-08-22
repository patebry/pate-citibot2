import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, Button } from 't63'
import { connect } from 'react-redux'
import R from 'ramda'
import { createCity, updateCity, getCity } from '../../db.js'
import { SET_CITY_X } from '../../constants'
const { toUpper } = R

class EditCity extends React.Component {
	componentDidMount() {
		const cityId = this.props.match.params.id
		this.props.dispatch(getCity(cityId))
	}
	render() {
		const props = this.props
		return (
			<div className="flex flex-column justify-start avenir w-100">
				<header className="flex flex-row justify-between items-center h3 pb2">
					<div className="pa2">
						<Link to="/cities">
							<a className="f6 link dim ba ph3 pv2 mb2 dib black"> back</a>
						</Link>
					</div>
					<div className="pt3">
						<img
							src="http://www.citibot.io/img/CititBotLogo-Final.png"
							alt="citibot"
							width="300"
						/>
					</div>
					<div className="mr2">
						<Link to={'/cities'}>
							<a
								className="f6 link dim ba ph3 pv2 mb2 dib black"
								onClick={props.submitCity(props._id)}
							>
								save
							</a>
						</Link>
					</div>
				</header>
				<main className="overflow-scroll">
					<h2 className="f4 f2-ns">Edit City</h2>
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
							value={props._id}
							onChange={props.handleId}
							name="Phone Number"
						/>
						<Link to="/numbers">
							<Button> Search </Button>
						</Link>
						<div className="">
							<Link to="/cities">
								<a
									className="w-100 f6 link dim ba ph3 pv2 mb2 dib tc black"
									onClick={props.submitCity(props._id)}
								>
									Save City
								</a>
							</Link>
						</div>
					</form>
				</main>
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
			return e => dispatch(updateCity(id))
		},
		handleName: e => doDispatch('NAME', e.target.value),
		handleId: e => doDispatch('_ID', e.target.value),
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

export default connector(EditCity)
