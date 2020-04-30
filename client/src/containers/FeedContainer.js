import { connect } from "react-redux";
import Feed from "../pages/Feed";

const mapStateToProps = ({ session }) => {
  return {
    user: session.user,
    isAuthenticated: session.isAuthenticated,
  };
};

export default connect(mapStateToProps)(Feed);
