import Home from "./pages/Home";
import NeedHelp from "./pages/NeedHelp";
import OfferHelp from "./pages/OfferHelp";
import AboutUs from "./pages/AboutUs";
import Medical from "./pages/Medical";
import SymptomsCheck from "./pages/SymptomsCheck";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EditAccount from "./pages/EditAccount";
import Feed from "./containers/FeedContainer";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import NearestHospital from "./pages/NearestHospital";
import CreatePost from "./pages/CreatePost";
import ProfileCompleted from "./pages/ProfileCompleted";
import CreateUserProfile from "./pages/CreateUserProfile";
import Faq from "./pages/Faq";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/auth/login",
    component: Login,
    layout: "logo",
    props: {
      isLoginForm: true,
      notLoggedInOnly: true,
    },
  },
  {
    path: "/auth/signup",
    component: Login,
    layout: "logo",
    props: {
      isLoginForm: false,
      notLoggedInOnly: true,
    },
  },
  {
    path: "/auth/verify-email",
    component: VerifyEmail,
    layout: "logo",
    props: {
      loggedInOnly: true,
    },
  },
  {
    path: "/need-help",
    component: NeedHelp,
  },
  {
    path: "/offer-help",
    component: OfferHelp,
  },
  {
    path: "/about-us",
    component: AboutUs,
  },
  {
    path: "/medical",
    component: Medical,
  },
  {
    path: "/nearest-hospital",
    component: NearestHospital,
    props: {
      mobiletabs: true,
      tabIndex: 0,
    },
  },
  {
    path: "/find-help",
    component: Feed,
  },
  {
    path: "/symptoms-check",
    component: SymptomsCheck,
    props: {
      mobiletabs: true,
      tabIndex: 1,
    },
  },
  {
    path: "/feed",
    exact: true,
    component: Feed,
    props: {
      mobiletabs: true,
      tabIndex: 2,
    },
  },
  {
    path: "/feed/:id",
    component: Feed,
    props: {
      mobiletabs: true,
      tabIndex: 2,
    },
  },
  {
    path: "/profile",
    component: Profile,
    props: {
      loggedInOnly: true,
    },
  },
  // todo: maybe move this inside the create-user-profile since it doesn't really need a separate route for a "page"
  {
    path: "/profile-completed",
    component: ProfileCompleted,
    props: {
      loggedInOnly: true,
    },
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
  {
    path: "/edit-account",
    component: EditAccount,
  },
  {
    path: "/create-post",
    component: CreatePost,
  },
  {
    path: "/create-profile",
    component: CreateUserProfile,
    layout: "navless",
  },
  {
    path: "/terms-conditions",
    component: TermsConditions,
  },
  {
    path: "/privacy-policy",
    component: PrivacyPolicy,
  },
  {
    path: "/cookies-policy",
    component: CookiesPolicy,
  },
  {
    path: "/faq", 
    component: Faq,
  }
];

export default routes;
