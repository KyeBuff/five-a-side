import { connect } from 'react-redux';
import PlayerListItem from '../components/lists/PlayerListItem';
import {removePlayer} from '../actions/state';

// const mapStateToProps = (state) => {
// 	//TODO convert to selector
// 	return {
// 		players: state.get('players'),
// 	}
// }	

const mapDispatchToProps = (dispatch, {timestamp}) => {
	return {
		removePlayer: () => dispatch(removePlayer(timestamp)),
	}
}	

export default connect(null, mapDispatchToProps)(PlayerListItem);