import {
	SET_CITIES,
	SET_NUMBERS,
	SET_CITY_X,
	SET_AREACODE,
	SET_AREACODE_X,
	SET_CITY,
	CLEAR_CITY,
	CLEAR_NUMBER,
	CLEAR_NUMBERS
} from './constants'
import { combineReducers } from 'redux'
import R from 'ramda'
const { merge } = R
export default combineReducers({
	cities,
	city,
	numbers,
	areaCodes,
	areaCode
})

function cities(state = [], action) {
	switch (action.type) {
		case SET_CITIES:
			return action.payload
		default:
			return state
	}
}

function areaCodes(state = [], action) {
	switch (action.type) {
		case SET_AREACODE:
			return action.payload
		default:
			return state
	}
}

function numbers(state = [], action) {
	switch (action.type) {
		case SET_NUMBERS:
			return action.payload
		default:
			return state
	}
}

function city(
	state = {
		name: '',
		_id: '',
		sites: '',
		content: '',
		description: ''
	},
	action
) {
	switch (action.type) {
		case SET_CITY_X + 'NAME':
			return merge(state, {
				name: action.payload
			})
		case SET_CITY_X + '_ID':
			return merge(state, {
				_id: action.payload
			})
		case SET_CITY_X + 'SITES':
			return merge(state, {
				sites: [action.payload]
			})
		case SET_CITY_X + 'DESCRIPTION':
			return merge(state, {
				description: action.payload
			})
		case SET_CITY_X + 'CONTENT':
			return merge(state, {
				content: action.payload
			})
		case SET_CITY:
			return action.payload
		case CLEAR_CITY:
			return {
				name: '',
				_id: '',
				sites: '',
				content: '',
				description: ''
			}
		default:
			return state
	}
}

function areaCode(
	state = {
		areaCode: ''
	},
	action
) {
	switch (action.type) {
		case SET_AREACODE_X + 'AREACODE':
			return merge(state, {
				areaCode: action.payload
			})
		case CLEAR_NUMBER:
			return { areaCode: '' }
		case CLEAR_NUMBERS:
			return { numbers: '' }
		default:
			return state
	}
}
