import history from '../../history'
import Login from '../../components/login.js'
const React = require('react')
const { Link } = require('react-router-dom')
const { List, ListItem } = require('t63')
const { connect } = require('react-redux')
const { getCity, removeCity } = require('../../db.js')
const CLEAR_NUMBERS = require('../../constants')

class ShowCity extends React.Component {
	componentDidMount() {
		const cityId = this.props.match.params.id
		this.props.dispatch(getCity(cityId))
		this.props.dispatch({ type: CLEAR_NUMBERS })
	}

	login() {
		this.props.auth.login()
	}
	render() {
		const props = this.props
		var phone = props.city._id
		const phoneNumber = `+${phone.substring(0, 1)}-${phone.substring(
			1,
			4
		)}-${phone.substring(4, 7)}-${phone.substring(7)}`
		const { isAuthenticated } = props.auth
		return (
			<div>
				{isAuthenticated() && (
					<div className="flex flex-column justify-between vh-100 w-100 avenir">
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
								<Link to={'/cities/edit/' + props.city._id}>
									<a className="f6 link grow ba ph3 pv2 mb2 dib black">edit</a>
								</Link>
							</div>
						</header>
						<main className="vh-100">
							<h4 className="tc">{props.city.name}</h4>
							<List className="center w-90 ba br2 b--light-gray">
								<ListItem className="h2 bg-light-gray">Phone Number</ListItem>
								<ListItem>{phoneNumber}</ListItem>
							</List>
							<List className="center w-90 ba br2 b--light-gray">
								<ListItem className="h2 bg-light-gray">Website</ListItem>
								<ListItem>
									<a href={'https://' + props.city.sites} target="_blank">
										{props.city.sites}
									</a>
								</ListItem>
							</List>
							<div className="center w-10">
								<a
									className="f6 link grow ba ph3 pv2 mb2 tc dib dark-red "
									onClick={props.handleRemoveCity}
								>
									Remove City
								</a>
							</div>
						</main>
					</div>
				)}
				{!isAuthenticated() && <Login auth={this.props.auth} />}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		city: state.city,
		cities: state.cities,
		numbers: state.numbers
	}
}

const mapActionsToProps = dispatch => {
	return {
		dispatch,
		handleRemoveCity: e => {
			if (
				window.confirm(
					'Are you sure? This will remove the city and it can not be brought back!'
				)
			) {
				dispatch(removeCity())
				history.push('/cities')
			}
		}
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(ShowCity)
