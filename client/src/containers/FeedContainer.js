import { connect } from "react-redux";
import Feed from "../pages/Feed";

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Feed);
