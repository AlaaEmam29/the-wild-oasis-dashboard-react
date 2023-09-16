const PathConstants = {
  ROOT: "",
  DASHBOARD: "/dashboard",
  BOOKINGS: "/bookings",
  LOGIN: "/login",
  SETTINGS: "/settings",

  ACCOUNT: "/account",
  CABINS: "/cabins",
  USERS: "/users",
  DETAILSBOOKING: "/bookings/:bookingId",
  DETAILSCHECKIN: "checking/:bookingId",
  NOTFOUND: "*",
};
const PAGINATIONLENGTH = 10;
const MAXSTEPSBOOKING = 3;
export { PathConstants, PAGINATIONLENGTH, MAXSTEPSBOOKING };
