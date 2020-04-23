import { Home } from "./pages/Home";
import { NeedHelp } from "./pages/NeedHelp";
import { OfferHelp } from "./pages/OfferHelp";
import { About } from "./pages/About";
import { Medical } from "./pages/Medical";
import { AirTableCOVID } from "./pages/AirTableCOVID";
import { SymptomsCheck } from "./pages/SymptomsCheck";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import NearestHospital from "./pages/NearestHospital";
import CreatePost from "./pages/CreatePost";

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
      isForgotPassword: false,
      notLoggedInOnly: true,
    },
  },
  {
    path: "/auth/signup",
    component: Login,
    layout: "logo",
    props: {
      isLoginForm: false,
      isForgotPassword: false,
    },
  },
  {
    path: "/auth/forgot-password",
    component: Login,
    layout: "logo",
    props: {
      isLoginForm: false,
      isForgotPassword: true,
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
    path: "/about",
    component: About,
  },
  {
    path: "/medical",
    component: Medical,
  },
  {
    path: "/nearest-hospital",
    component: NearestHospital,
  },
  {
    path: "/AirTableCOVID",
    component: AirTableCOVID,
  },
  {
    path: "/find-help",
    component: Feed,
  },
  {
    path: "/symptoms-check",
    component: SymptomsCheck,
  },
  {
    path: "/feed",
    component: Feed,
  },
  {
    path: "/create-post",
    component: CreatePost,
  },
];

export default routes;
