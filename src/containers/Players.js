import { connect } from 'react-redux';
import Players from '../components/Players';
import {setPlayer, setTeams, clearPlayers} from '../actions/state';
// Importing selector
import { fetchPlayers } from '../reducers/reducer';

const mapStateToProps = (state) => {
	return {
		players: fetchPlayers(state),
	}
}	

const mapDispatchToProps = (dispatch) => {
	return {
		addPlayer: (player) => dispatch(setPlayer(player)),
		setTeams: () => dispatch(setTeams()),
		clearPlayers: () => dispatch(clearPlayers()),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Players);