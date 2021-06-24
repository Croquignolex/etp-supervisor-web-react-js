import {connect} from "react-redux";

import ManagerCashMovementsComponent from "../../components/managers/ManagerCashMovementsComponent";

// Map state function to component props
const mapStateToProps = (state) => ({
    manager: state.managers.current,
    // request: state.managersRequests.edit,
});

// Connect component to Redux
export default connect(mapStateToProps)(ManagerCashMovementsComponent);