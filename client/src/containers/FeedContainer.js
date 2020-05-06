import Feed from "../pages/Feed";
import { connect } from "react-redux";

const mapStateToProps = ({ session }) => {
    return {
        user: session.user,
        isAuthenticated: session.isAuthenticated,
    };
};

export default connect(mapStateToProps)(Feed);
