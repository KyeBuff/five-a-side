import { connect } from 'react-redux';
import PlayerListItem from '../components/lists/PlayerListItem';
import {updatePlayerName, removePlayer} from '../actions/state';

// const mapStateToProps = (state) => {
// 	//TODO convert to selector
// 	return {
// 		players: state.get('players'),
// 	}
// }	

const mapDispatchToProps = (dispatch, {timestamp, teamID}) => {
	return {
		updatePlayerName: (playerName) => dispatch(updatePlayerName(playerName, timestamp, teamID)),
		removePlayer: () => dispatch(removePlayer(timestamp, teamID)),
	}
}	

export default connect(null, mapDispatchToProps)(PlayerListItem);