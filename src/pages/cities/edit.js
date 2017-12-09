import history from '../../history'
import Login from '../../components/login.js'
const React = require('react')
const { Link } = require('react-router-dom')
const { TextField } = require('t63')
const { connect } = require('react-redux')
const R = require('ramda')
const { updateCity, getCity } = require('../../db.js')
const { SET_CITY_X } = require('../../constants')

const { toUpper } = R

class EditCity extends React.Component {
	componentDidMount() {
		const cityId = this.props.match.params.id
		this.props.dispatch(getCity(cityId))
	}

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
									<a className="f6 link grow ba ph3 pv2 mb2 dib black"> back</a>
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
										className="f6 link ba ph3 pv2 mb2 dib black"
										onClick={props.submitCity(props)}
									>
										save
									</a>
								</Link>
							</div>
						</header>
						<main className="overflow-scroll">
							<h2 className="f4 f2-ns pa2">Edit City</h2>
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
									name="Phone number (cannot be changed)"
								/>
								<div className="">
									<a
										className="w-100 f6 link grow ba ph3 pv2 mb2 dib tc black"
										onClick={props.submitCity(props)}
									>
										Save City
									</a>
								</div>
							</form>
						</main>
					</div>
				)}
				{!isAuthenticated() && <Login auth={this.props.auth} />}
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
		submitCity: props => {
			return e => {
				if (
					props._id !== '' &&
					props.name.length !== 0 &&
					props.sites[0].length !== 0 &&
					props.content.length !== 0 &&
					props.description.length !== 0
				) {
					dispatch(updateCity(props._id))
					history.push('/cities')
				} else {
					window.alert('Please fill in every field to save a city.')
				}
			}
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

export default connector(EditCity)
