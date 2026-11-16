"use client";

import { createContext, useContext } from "react";

// True once the preloader has finished, so intro animations can start.
export const IntroContext = createContext(true);

export const useIntroDone = () => useContext(IntroContext);
