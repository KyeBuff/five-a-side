import { connect } from 'react-redux';
import Players from '../components/Players';
import {setPlayer, balanceTeams} from '../actions/state';
import { List } from 'immutable';

const mapStateToProps = (state) => {
	//TODO convert to selector
	return {
		// players: List([]).concat(state.get('teams').find(team => team.get('id') === 1).get('players'), state.get('teams').find(team => team.get('id') === 2).get('players'))
		players: state.get('players'),
	}
}	

const mapDispatchToProps = (dispatch) => {
	return {
		addPlayer: (player) => dispatch(setPlayer(player)),
		balanceTeams: () => dispatch(balanceTeams()),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Players);