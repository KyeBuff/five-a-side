import { connect } from 'react-redux';
import { updateTeamName } from '../actions/state';
import Team from '../components/Team';

const mapStateToProps = (state) => {
	//TODO convert to selector
	return {
		team: state.get('teams').find(team => team.get('id') === 2),
	}
}	

const mapDispatchToProps = (dispatch, props) => {
	//TODO more effective way? team id
	const id = 2;
	return {
		updateTeamName: (teamName) => dispatch(updateTeamName(teamName, id)),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Team);