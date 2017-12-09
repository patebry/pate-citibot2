import Login from '../../components/login.js'
const React = require('react')
const { Link } = require('react-router-dom')
const { List, ListItem } = require('t63')
const { connect } = require('react-redux')
const { map } = require('ramda')
const { listCities } = require('../../db.js')
const { CLEAR_CITY, CLEAR_NUMBERS } = require('../../constants.js')

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
		this.props.dispatch({ type: CLEAR_NUMBERS })
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
							<List className="bg-light-gray pa2">
								{(this.props.dispatch(listCities), map(li, props.cities))}
							</List>
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
		cities: state.cities,
		name: state.city.name,
		_id: state.city._id,
		sites: state.city.sites,
		description: state.city.description,
		content: state.city.content,
		numbers: state.numbers
	}
}

const connector = connect(mapStateToProps)

export default connector(ListCities)
