import { connect } from "react-redux";
import { updateTeamName, updateTeamColor } from "../actions/state";
import Team from "../components/teams/Team";
// import selectors
import {selectTeamOne} from "../reducers/reducer";

const mapStateToProps = (state) => {
	return {
		team: selectTeamOne(state),
	}
}	

const mapDispatchToProps = (dispatch, props) => {
	return {
		updateTeamName: (teamName, id) => dispatch(updateTeamName(teamName, id)),
		updateTeamColor: (color, id) => dispatch(updateTeamColor(color, id)),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Team);