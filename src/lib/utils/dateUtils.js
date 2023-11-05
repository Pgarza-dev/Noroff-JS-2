import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatDateFromNow = (date) => {
  return dayjs(date).fromNow();
};

export const formatDate = (date, format) => {
  return dayjs(date).format(format);
};
