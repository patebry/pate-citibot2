const React = require('react')

class Login extends React.Component {
	goTo(route) {
		this.props.history.replace(`/${route}`)
	}

	login() {
		this.props.auth.login()
	}

	render() {
		return (
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
		)
	}
}

export default Login
