import { useEffect, useState } from "react";

const TimeDisplay = ({ timezone }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
    hour12: true,
  });

  const formattedTime = formatter.format(currentTime);

  return formattedTime;
};

export default TimeDisplay;
