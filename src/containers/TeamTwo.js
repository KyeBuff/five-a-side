import { connect } from 'react-redux';
import { updateTeamName } from '../actions/state';
import Team from '../components/Team';
import {fetchTeamTwo} from '../reducers/reducer';

const mapStateToProps = (state) => {
	//TODO convert to selector
	return {
		team: fetchTeamTwo(state),
	}
}	

const mapDispatchToProps = (dispatch, props) => {
	const id = 2;
	return {
		updateTeamName: (teamName) => dispatch(updateTeamName(teamName, id)),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Team);