
import { Home } from './pages/Home';
import { NeedHelp } from './pages/NeedHelp';
import { OfferHelp } from './pages/OfferHelp';
import { About } from './pages/About';
import { Medical } from './pages/Medical';
import { AirTableCOVID } from './pages/AirTableCOVID';

export const routes = [{
    path: "/",
    component: Home,
    exact: true,
}, {
    path: '/need-help',
    component: NeedHelp,
}, {
    path: '/offer-help',
    component: OfferHelp,
}, {
    path: '/about',
    component: About,
}, {
    path: '/medical',
    component: Medical,
}, {
    path: '/AirTableCOVID',
    component: AirTableCOVID,
}];
