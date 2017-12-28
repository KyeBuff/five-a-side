import { connect } from 'react-redux';
import Players from '../components/Players';
import {setPlayer} from '../actions/state';

const mapDispatchToProps = (dispatch) => {
	return {
		addPlayer: (player) => dispatch(setPlayer(player)),
	}
}	

export default connect(null, mapDispatchToProps)(Players);