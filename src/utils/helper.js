import {
  differenceInBusinessDays,
  differenceInMilliseconds,
  formatDistance,
  parseISO,
} from "date-fns";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const formatDistanceFromNow = (dateStr) => {
  const data = formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
  return data;
};

const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end) today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export { USDollar, formatDistanceFromNow, getToday };
