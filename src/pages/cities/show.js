import React from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem, Button } from 't63'
import { connect } from 'react-redux'
import { getCity, removeCity } from '../../db.js'

class ShowCity extends React.Component {
	componentDidMount() {
		const cityId = this.props.match.params.id
		this.props.dispatch(getCity(cityId))
	}

	render() {
		const props = this.props
		return (
			<div className="flex flex-column justify-between vh-100 w-100 avenir">
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
						<Link to={'/cities/edit/' + props.city._id}>
							<a className="f6 link dim ba ph3 pv2 mb2 dib black">
								edit
							</a>
						</Link>
					</div>
				</header>
				<main className="vh-100">
					<h4 className="tc">{props.city.name}</h4>
					<List className="center w-90 ba br2 b--light-gray">
						<ListItem className="h2 bg-light-gray">Phone Number</ListItem>
						<ListItem>{props.match.params.id}</ListItem>
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
							<Button
								className="f6 link dim ba ph3 pv2 mb2 w-100 dib white bg-dark-red"
								onClick={props.handleRemoveCity}
							>
								Remove City
							</Button>
						</Link>
					</div>
				</main>
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log('state', state)
	return {
		city: state.city
	}
}

const mapActionsToProps = dispatch => {
	return {
		dispatch,
		handleRemoveCity: e => {
			if (window.confirm('Are you sure?')) {
				dispatch(removeCity())
			}
		}
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(ShowCity)
