import { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as moment from "moment";
import "moment-timezone";
import { useSession } from "@/hooks";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import advanced from "dayjs/plugin/advancedFormat";
dayjs.extend(advanced);
dayjs.extend(utc);
dayjs.extend(timezone);

export const useDateFormatter = () => {
  const { session } = useSession();
  const [timezone, setTimezone] = useState("");

  useEffect(() => {
    if (session && session?.user?.timezone) {
      setTimezone(session?.user?.timezone);
    } else {
      setTimezone(dayjs.tz.guess());
    }
  }, [session]);

  const formatListDate = (p: string | Date) => {
    return timezone
      ? dayjs(p).utc().local().tz(timezone).format("MMM DD YYYY")
      : "";
  };

  const formatListTime = (p: string | Date) => {
    let timeString = timezone
      ? dayjs(p).utc().local().tz(timezone).format("hh:mm A")
      : "";
    timeString = timeString ? `${timeString} ${moment.tz(timezone).zoneAbbr()}` : "";
    return timeString;
  };

  return { formatListDate, formatListTime };
};
