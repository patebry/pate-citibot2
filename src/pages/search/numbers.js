import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, ListItem, List } from 't63'
import { connect } from 'react-redux'
import { getNumbers } from '../../db.js'
import { toUpper, map } from 'ramda'
import { SET_AREACODE_X, AREACODE, SET_CITY_X } from '../../constants'

class SearchPhoneNumbers extends React.Component {
	componentDidMount() {
		this.props.dispatch(getNumbers)
	}
	login() {
		this.props.auth.login()
	}
	render() {
		const props = this.props
		const { isAuthenticated } = props.auth
		function li(numbers) {
			return (
				<ListItem key={numbers}>
					<div className="f5 black">
						<h3>{numbers}</h3>
						<Link to={`/cities/new?${numbers}`}>
							<a className="f6 link grow ba ph3 pv2 mb2 dib black center">
								Use
							</a>
						</Link>
					</div>
				</ListItem>
			)
		}
		return (
			<div>
				{isAuthenticated() && (
					<div className="flex flex-column justify-start avenir w-100">
						<header className="h3 flex justify-between items-center">
							<div className="ml2">
								<Link to="/cities/new">
									<a className="f6 link grow ba ph3 pv2 mb2 dib black">back</a>
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
								<Link to="/cities">
									<a className="f6 link grow ba ph3 pv2 mb2 dib black">home</a>
								</Link>
							</div>
						</header>
						<main className="overflow-scroll">
							<h2 className="f4 f2-ns">Create City</h2>
							<form className="ph2">
								<TextField
									name="Area Code"
									value={props.areaCode.areaCode}
									onChange={props.handleAreaCode}
								/>
								<div className="">
									<List className="fl">{map(li, props.numbers)}</List>
								</div>
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

const mapStateToProps = state => {
	return {
		numbers: state.numbers,
		areaCode: state.areaCode,
		_id: state.city._id
	}
}

const mapActionsToProps = dispatch => {
	const doDispatch = (field, value) => {
		dispatch({
			type: SET_AREACODE_X + toUpper(field),
			payload: value
		})
	}
	const dispatchCity = (field, value) => {
		dispatch({
			type: SET_CITY_X + toUpper(field),
			payload: value
		})
	}

	return {
		dispatch,
		handleAreaCode: e => {
			doDispatch(AREACODE, e.target.value)
			dispatch(getNumbers(e.target.value))
		},
		handleSearch: e => {
			dispatch(getNumbers(e.target.value))
		},
		handleId: e => dispatchCity('_ID', e)
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(SearchPhoneNumbers)
