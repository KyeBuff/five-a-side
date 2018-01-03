import { connect } from 'react-redux';
import { updateTeamName, clearPlayers } from '../actions/state';
import Team from '../components/teams/Team';
import {fetchTeamTwo} from '../reducers/reducer';

const mapStateToProps = (state) => {
	return {
		team: fetchTeamTwo(state),
	}
}	

const mapDispatchToProps = (dispatch, props) => {
	const id = 2;
	return {
		updateTeamName: (teamName) => dispatch(updateTeamName(teamName, id)),
		clearPlayers: () => dispatch(clearPlayers()),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Team);