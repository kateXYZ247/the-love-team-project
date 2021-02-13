import HomeIcon from "@material-ui/icons/Home";
import TimerIcon from "@material-ui/icons/Timer";
import HistoryIcon from "@material-ui/icons/History";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import NewReleasesIcon from "@material-ui/icons/NewReleases";

export const PATH_HOME = "/";
export const PATH_LOGIN = "/login";
export const PATH_REGISTER = "/register";
export const PATH_TEST = "/test";
export const PATH_ORDER = "/order";
export const PATH_HISTORY = "/history";
export const PATH_APPOINTMENTS = "/appointments";

export const PATH_PROVIDER_HOME = "/provider";
export const PATH_PROVIDER_LOGIN = "/provider/login";
export const PATH_PROVIDER_LIST_SERVICES = "/provider/requests";
export const PATH_PROVIDER_HISTORY = "/provider/history";
export const PATH_PROVIDER_UPCOMING_SERVICES = "/provider/services";
export const PATH_PROVIDER_PROFILE = "/provider/profile";

export const PATH_ADMIN_LOGIN = "/admin/login";

export const NAV_BAR_DEFAULT_PATH_ITEMS = [
  {
    label: "Home",
    path: PATH_HOME,
    icon: <HomeIcon />,
  },
  {
    label: "Book",
    path: PATH_ORDER,
    icon: <ShoppingBasketIcon />,
  },
];

export const NAV_BAR_USER_PATH_ITEMS = [
  {
    label: "Home",
    path: PATH_HOME,
    icon: <HomeIcon />,
  },
  {
    label: "Book",
    path: PATH_ORDER,
    icon: <ShoppingBasketIcon />,
  },
  {
    label: "Orders",
    path: PATH_HISTORY,
    icon: <HistoryIcon />,
  },
  {
    label: "Appointments",
    path: PATH_APPOINTMENTS,
    icon: <TimerIcon />,
  },
];

export const NAV_BAR_PROVIDER_PATH_ITEMS = [
  {
    label: "Requests",
    path: PATH_HOME,
    icon: <NewReleasesIcon />,
  },
  {
    label: "Services",
    path: PATH_PROVIDER_UPCOMING_SERVICES,
    icon: <TimerIcon />,
  },
  {
    label: "Histories",
    path: PATH_PROVIDER_HISTORY,
    icon: <HistoryIcon />,
  },
  {
    label: "Profile",
    path: PATH_PROVIDER_PROFILE,
    icon: <PersonIcon />,
  },
];
