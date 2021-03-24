import {connect} from "react-redux";

import SupplyDetailsComponent from "../../components/operations/SupplyDetailsComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    supply: state.supplies.current,
    // request: state.zonesRequests.show,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(SupplyDetailsComponent);