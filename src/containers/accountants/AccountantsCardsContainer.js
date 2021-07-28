import {connect} from "react-redux";

import AccountantsCardsComponent from "../../components/accountants/AccountantsCardsComponent";

// Map dispatch function to component props
const mapDispatchToProps = (dispatch) => ({
    dispatch: (action) => { dispatch(action) }
});

// Connect component to Redux
export default connect(mapDispatchToProps)(AccountantsCardsComponent);