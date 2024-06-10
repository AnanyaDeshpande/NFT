import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./AutoType.css";

const AutoType = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const options = {
      strings: ["Buy tickets", "One stop destination", "For your cricket addiction"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="autotypecontainer">
      <h1>Get access to IPL Tickets using IPL Tokens. <br /> <span className="auto-type" ref={typedElement}></span></h1>
    </div>
  );
};

export default AutoType;
