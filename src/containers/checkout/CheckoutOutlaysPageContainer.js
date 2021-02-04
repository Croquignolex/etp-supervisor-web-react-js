import {connect} from "react-redux";

import {setPageTitle} from "../../functions/generalFunctions";
import {CHECKOUT_OUTlAYS_PAGE} from "../../constants/pageNameConstants";
import CheckoutOutlaysPage from "../../pages/checkout/CheckoutOutlaysPage";

setPageTitle(CHECKOUT_OUTlAYS_PAGE);

// Map state function to component props
const mapStateToProps = (state) => ({
    page: state.outlays.page,
    outlays: state.outlays.list,
    hasMoreData: state.outlays.hasMoreData,
    outlaysRequests: state.outlaysRequests,
});

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutOutlaysPage);