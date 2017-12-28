import { Map, List } from 'immutable';

const initialState = Map({
	teams: List([]),
});

const reducer = (state=initialState, action) => {
	return state;
}

export default reducer;