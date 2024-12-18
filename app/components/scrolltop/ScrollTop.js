"use client";

import { BsArrowUp } from "react-icons/bs";
import "./scrolltop.scss";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useEffect, useState } from "react";

export default function ScrollTop() {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const percent = (scrolled / scrollable) * 100;
      setPercentage(percent);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div
      className={`scrolltop ${percentage > 10 && "show"}`}
      onClick={scrollToTop}
    >
      <CircularProgressbarWithChildren value={percentage}>
        <BsArrowUp />
      </CircularProgressbarWithChildren>{" "}
    </div>
  );
}
