import { connect } from 'react-redux';
import Players from '../components/Players';
import {setPlayer} from '../actions/state';

const mapStateToProps = (state) => {
	//TODO convert to selector
	return {
		players: state.get('players'),
	}
}	

const mapDispatchToProps = (dispatch) => {
	return {
		addPlayer: (player) => dispatch(setPlayer(player)),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Players);