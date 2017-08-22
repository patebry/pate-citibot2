import React from 'react'
import { Link } from 'react-router-dom'
import { TextField, Button, ListItem, List } from 't63'
import { connect } from 'react-redux'
import { getNumbers, setNumber } from '../../db.js'
import { toUpper, map, pathOr } from 'ramda'
import { SET_AREACODE_X, AREACODE } from '../../constants'

const li = numbers => {
	return (
		<ListItem>
			<div className="f5 black">
				<h3>{numbers}</h3>
				<h5>copy number and paste on previous page</h5>
			</div>
		</ListItem>
	)
}

class SearchPhoneNumbers extends React.Component {
	componentDidMount() {
		console.log('this.props', this.props)
		this.props.dispatch(getNumbers)
	}
	render() {
		return (
			<div className="flex flex-column justify-start avenir w-100">
				<header className="h3 flex justify-between items-center bg-light-blue">
					<div className="ml2">
						<Link to="/cities/new">
							<Button className="bg-dark-blue">
								back
							</Button>
						</Link>
					</div>
					<div className="f4">Citibot</div>
					<div className="mr2">
						<Link to="/cities">
							<Button className="bg-dark-blue">
								home
							</Button>
						</Link>
					</div>
				</header>
				<main className="overflow-scroll">
					<h2 className="f4 f2-ns">Create City</h2>
					<form className="ph2">
						<TextField
							name="Area Code"
							value={this.props.areaCode.areaCode}
							onChange={this.props.handleAreaCode}
						/>
						<div className="">
							<List className="fl">
								{map(li, this.props.numbers)}
							</List>
						</div>
					</form>
				</main>
			</div>
		)
	}
}

const mapStateToProps = state => {
	console.log('state', state)
	return {
		numbers: state.numbers,
		number: state.number,
		areaCode: state.areaCode
	}
}

const mapActionsToProps = dispatch => {
	const doDispatch = (field, value) => {
		dispatch({
			type: SET_AREACODE_X + toUpper(field),
			payload: value
		})
	}
	return {
		dispatch,
		useNumber: number => {
			dispatch(setNumber(number))
		},
		handleAreaCode: e => {
			doDispatch(AREACODE, e.target.value)
			dispatch(getNumbers(e.target.value))
		},
		handleSearch: e => {
			dispatch(getNumbers(e.target.value))
		}
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(SearchPhoneNumbers)
