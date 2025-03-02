"use client";

import { useEffect } from "react";

export function ScriptLoader() {
  useEffect(() => {
    const scripts = [
      "//spitefulmotor.com/c-D.9h6gbm2O5FlBSBWGQg9WNfjvEfzYOFDnElxRN/Sy0G2/M/TcME4aMpTmEk2X",
      "//spitefulmotor.com/cUDH9.6-bJ2A5elsS/W/Ql9rNfjYEwzfORDdE_ynMIyT0Y2/MhT/ME4IMATiIB0m",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.referrerPolicy = "no-referrer-when-downgrade";

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    });
  }, []);

  return null;
}
