const fetch = require('isomorphic-fetch')
const { SET_CITIES, SET_CITY, SET_NUMBERS } = require('./constants')

const apiURL = 'http://localhost:4000'

const getOptions = (token, method = 'GET', body = null) => {
	return {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		},
		body: body && JSON.stringify(body)
	}
}

export const cities = (dispatch, getState) => {
	fetch(apiURL + '/cities', getOptions(getState()))
		.then(res => res.json())
		.then(data => dispatch({ type: SET_CITIES, payload: data }))
}

export const createCity = (dispatch, getState) => {
	fetch(apiURL + '/cities', getOptions(getState(), 'POST', getState().city))
		.then(res => res.json())
		.then(data =>
			dispatch({
				type: SET_CITY,
				payload: {
					name: '',
					_id: '',
					sites: '',
					description: '',
					content: ''
				}
			})
		)
}

export const updateCity = id => (dispatch, getState) => {
	fetch(
		apiURL + '/cities/' + id,
		getOptions(getState(), 'PUT', getState().city)
	)
		.then(res => res.json())
		.then(data =>
			dispatch({
				type: SET_CITY,
				payload: {
					name: '',
					_id: '',
					sites: '',
					description: '',
					content: '',
					trello: ''
				}
			})
		)
}

export const listCities = (dispatch, getState) => {
	fetch(apiURL + '/cities', getOptions(getState()))
		.then(res => res.json())
		.then(data => dispatch({ type: SET_CITIES, payload: data }))
}

export const getCity = id => (dispatch, getState) => {
	fetch(apiURL + `/cities/${id}`, getOptions(getState()))
		.then(res => res.json())
		.then(data => {
			dispatch({ type: SET_CITY, payload: data })
		})
}

export const removeCity = e => (dispatch, getState) => {
	const city = getState().city
	fetch(
		apiURL + '/cities/' + city._id,
		getOptions(getState(), 'DELETE')
	).then(res => res.json())
}

export const getNumbers = areaCode => (dispatch, getState) => {
	if (areaCode.length !== 0 && !isNaN(areaCode)) {
		fetch(apiURL + '/numbers/' + areaCode, getOptions(getState()))
			.then(res => res.json())
			.then(data => dispatch({ type: SET_NUMBERS, payload: data }))
	}
}
