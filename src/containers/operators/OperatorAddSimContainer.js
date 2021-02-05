import {connect} from "react-redux";

import OperatorAddSimComponent from "../../components/operators/OperatorAddSimComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    operator: state.operators.current,
    request: state.operatorsRequests.sim,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(OperatorAddSimComponent);