import { connect } from 'react-redux';
import Players from '../components/Players';
import {setPlayers} from '../actions/state';

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPlayers: (players) => dispatch(setPlayers()),
	}
}	

export default connect(null, mapDispatchToProps)(Players);