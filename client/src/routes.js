import { Home } from "./pages/Home";
import { NeedHelp } from "./pages/NeedHelp";
import { OfferHelp } from "./pages/OfferHelp";
import { About } from "./pages/About";
import { Medical } from "./pages/Medical";
import { AirTableCOVID } from "./pages/AirTableCOVID";
import FindHelp from "./pages/find-help/FindHelp";
import { SymptomsCheck } from "./pages/SymptomsCheck";
import { Profile } from "./pages/Profile";
import { EditProfile } from "./pages/EditProfile";
import Feed from "./pages/Feed";
import Login from "./pages/Login";

export const routes = [
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
    },
  },
  {
    path: "/auth/signup",
    component: Login,
    layout: "logo",
    props: {
      isLoginForm: false,
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
    path: "/AirTableCOVID",
    component: AirTableCOVID,
  },
  {
    path: "/find-help",
    component: FindHelp,
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
    path: "/profile",
    component: Profile,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
  },
];
