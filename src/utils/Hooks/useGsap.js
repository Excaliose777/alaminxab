import { useLayoutEffect, useState } from "react";
import { gsap } from "gsap";

const useGSAPTimeline = () => {
  const [timeline, setTimeline] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setLoading(false),
      });
      setTimeline(tl);
    });

    return () => context.revert();
  }, []);

  return { timeline, loading };
};

export default useGSAPTimeline;
