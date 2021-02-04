import {connect} from "react-redux";

import OperationsAffordsAddAffordComponent from "../../components/operations/OperationsAffordsAddAffordComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    request: state.affordsRequests.add,
    allSimsRequests: state.simsRequests.all
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsAffordsAddAffordComponent);