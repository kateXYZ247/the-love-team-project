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

export const NAV_BAR_DEFAULT_PATH_ITEMS = [
  {
    label: "Home",
    path: PATH_HOME,
  },
  {
    label: "Book",
    path: PATH_ORDER,
  },
];

export const NAV_BAR_USER_PATH_ITEMS = [
  {
    label: "Home",
    path: PATH_HOME,
  },
  {
    label: "Book",
    path: PATH_ORDER,
  },
  {
    label: "Orders",
    path: PATH_HISTORY,
  },
  {
    label: "Appointments",
    path: PATH_APPOINTMENTS,
  },
];

export const NAV_BAR_PROVIDER_PATH_ITEMS = [
  {
    label: "Requests",
    path: PATH_HOME,
  },
  {
    label: "Services",
    path: PATH_PROVIDER_UPCOMING_SERVICES,
  },
  {
    label: "Histories",
    path: PATH_PROVIDER_HISTORY,
  },
  {
    label: "Profile",
    path: PATH_PROVIDER_PROFILE,
  },
];
