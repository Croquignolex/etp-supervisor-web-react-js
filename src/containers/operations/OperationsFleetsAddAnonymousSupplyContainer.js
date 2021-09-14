import {connect} from "react-redux";

import OperationsFleetsAddAnonymousFleetsComponent from "../../components/operations/OperationsFleetsAddAnonymousFleetsComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    sims: state.sims.list,
    zones: state.zones.list,
    zonesRequests: state.zonesRequests.all,
    simsRequests: state.simsRequests.master,
    request: state.suppliesRequests.anonymous,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperationsFleetsAddAnonymousFleetsComponent);