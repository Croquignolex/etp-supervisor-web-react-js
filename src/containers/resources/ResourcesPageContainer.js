import {connect} from "react-redux";

import ResourcesPage from "../../pages/users/ResourcesPage";
import {RESOURCES} from "../../constants/pageNameConstants";
import {setPageTitle} from "../../functions/generalFunctions";

setPageTitle(RESOURCES);

// Map state function to component props
const mapStateToProps = (state) => ({
    page: state.agents.page,
    resources: state.resources.list,
    resourcesRequests: state.resourcesRequests,
    hasMoreData: state.resources.hasMoreData,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ResourcesPage);
