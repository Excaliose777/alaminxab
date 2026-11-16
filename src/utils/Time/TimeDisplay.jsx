"use client";

import { useEffect, useMemo, useState } from "react";

const TimeDisplay = ({ timezone = "Africa/Lagos" }) => {
  // Start empty so server and client markup match; fill in after mount.
  const [now, setNow] = useState(null);

  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    [timezone]
  );

  useEffect(() => {
    let timeoutId;
    // Only minutes are shown, so tick once per minute, aligned to the minute boundary.
    const tick = () => {
      const date = new Date();
      setNow(date);
      timeoutId = setTimeout(tick, 60_000 - (date.getTime() % 60_000));
    };
    tick();
    return () => clearTimeout(timeoutId);
  }, []);

  return now ? formatter.format(now) : "--:-- --";
};

export default TimeDisplay;
