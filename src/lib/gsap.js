"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Register plugins once for the whole app instead of in every component.
gsap.registerPlugin(useGSAP, ScrollTrigger);

// Skip GSAP's lag smoothing so Lenis-driven scrolling never "jumps" after a slow frame.
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger, useGSAP };
