import { connect } from 'react-redux';
import PlayerListItem from '../components/lists/PlayerListItem';
import {removePlayer} from '../actions/state';

const mapDispatchToProps = (dispatch, {timestamp}) => {
	return {
		removePlayer: () => dispatch(removePlayer(timestamp)),
	}
}	

export default connect(null, mapDispatchToProps)(PlayerListItem);