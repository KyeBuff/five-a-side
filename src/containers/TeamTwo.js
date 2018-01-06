import { connect } from "react-redux";
import { updateTeamName, updateTeamColor, clearPlayers } from "../actions/state";
import Team from "../components/teams/Team";
import {selectTeamTwo} from "../reducers/reducer";

const mapStateToProps = (state) => {
	return {
		team: selectTeamTwo(state),
	}
}	

const mapDispatchToProps = (dispatch, props) => {
	return {
		updateTeamName: (teamName, id) => dispatch(updateTeamName(teamName, id)),
		updateTeamColor: (color, id) => dispatch(updateTeamColor(color, id)),
		clearPlayers: () => dispatch(clearPlayers()),
	}
}	

export default connect(mapStateToProps, mapDispatchToProps)(Team);