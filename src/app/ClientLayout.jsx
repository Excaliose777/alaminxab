"use client";

import ReactLenis from "lenis/react";
import { ViewTransition } from "react";
import ClientWrapper from "@/utils/ClientWrapper/ClientWrapper";

export default function ClientLayout({ children }) {
  return (
    <ReactLenis root>
      <body>
        <ViewTransition
          name="page"
          onUpdate={(instance) => {
            instance.old.animate(
              {
                transform: ["scale(1)", "scale(0)"],
                opacity: [1, 0],
              },
              { duration: 700, easing: "ease" }
            );

            instance.new.animate(
              {
                transform: ["scale(1.1)", "scale(1)"],
                opacity: [0, 1],
              },
              { duration: 700, easing: "ease" }
            );
          }}
        >
          <ClientWrapper>{children}</ClientWrapper>
        </ViewTransition>
      </body>
    </ReactLenis>
  );
}
