import Login from '../../components/login.js'
const React = require('react')
const { Link } = require('react-router-dom')
const { TextField, ListItem, List } = require('t63')
const { connect } = require('react-redux')
const { getNumbers } = require('../../db.js')
const { toUpper, map } = require('ramda')
const {
	SET_AREACODE_X,
	AREACODE,
	SET_CITY_X,
	CLEAR_NUMBERS,
	CLEAR_AREACODE
} = require('../../constants')

class SearchPhoneNumbers extends React.Component {
	componentDidMount() {
		this.props.dispatch(getNumbers)
		this.props.dispatch({ type: CLEAR_NUMBERS })
		this.props.dispatch({ type: CLEAR_AREACODE })
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
							<h2 className="f4 f2-ns pa2">Select Number</h2>
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
				{!isAuthenticated() && <Login auth={this.props.auth} />}
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
	const dispatchId = (field, value) => {
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
		handleId: e => dispatchId('_ID', e)
	}
}

const connector = connect(mapStateToProps, mapActionsToProps)

export default connector(SearchPhoneNumbers)
