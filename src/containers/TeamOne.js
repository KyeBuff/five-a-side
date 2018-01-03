import { connect } from 'react-redux';
import { updateTeamName, clearPlayers } from '../actions/state';
import Team from '../components/teams/Team';
// import selectors
import {fetchTeamOne} from '../reducers/reducer';

const mapStateToProps = (state) => {
	return {
		team: fetchTeamOne(state),
	}
}	

const mapDispatchToProps = (dispatch) => {
	//TODO more effective way? team id
	const id = 1;
	return {
		updateTeamName: (teamName) => dispatch(updateTeamName(teamName, id)),
		clearPlayers: () => dispatch(clearPlayers()),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Team);