import { connect } from 'react-redux';
import Players from '../components/Players';
import {setPlayer, balanceTeams, clearPlayers} from '../actions/state';
// Importing selector
import { fetchPlayers } from '../reducers/reducer';

const mapStateToProps = (state) => {
	//TODO convert to selector
	return {
		players: fetchPlayers(state),
	}
}	

const mapDispatchToProps = (dispatch) => {
	return {
		addPlayer: (player) => dispatch(setPlayer(player)),
		balanceTeams: () => dispatch(balanceTeams()),
		clearPlayers: () => dispatch(clearPlayers()),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Players);