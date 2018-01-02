import { connect } from 'react-redux';
import { updateTeamName } from '../actions/state';
import Team from '../components/Team';
// import selectors
import {fetchTeamOne} from '../reducers/reducer';

const mapStateToProps = (state) => {
	//TODO convert to selector
	return {
		team: fetchTeamOne(state),
	}
}	

const mapDispatchToProps = (dispatch, props) => {
	//TODO more effective way? team id
	const id = 1;
	return {
		updateTeamName: (teamName) => dispatch(updateTeamName(teamName, id)),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Team);