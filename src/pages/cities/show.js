import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem } from 't63'
import { connect } from 'react-redux'
import { getCity, removeCity } from '../../db.js'

class ShowCity extends React.Component {
	componentDidMount() {
		const cityId = this.props.match.params.id
		this.props.dispatch(getCity(cityId))
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
								<Link to="/cities">
									<a
										className="f6 link grow ba ph3 pv2 mb2 tc dib dark-red "
										onClick={props.handleRemoveCity}
									>
										Remove City
									</a>
								</Link>
							</div>
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
		city: state.city,
		cities: state.cities
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
			}
		}
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(ShowCity)
