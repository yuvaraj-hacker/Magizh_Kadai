// import React from "react";
// import imgflower from "/assets/megaoffers/flower.png";
import DealSwiper from "../Home/DealSwiper";

export default function DailyDeals({ Deals, styles, border }) {
  return (
    <>
      <section className="w-full px-3 mx-auto mt-10 lg:p-5">
        <div className="justify-between hidden -my-5 lg:flex lg:-my-10">
          <img src="/images/Design/parsley 17.png" alt="" />
          <img src="/images/Design/parsley 16.png" alt="" />
        </div>
        <div className="-mt-10">
          {/* Top Design */}
          <div className="relative flex items-end justify-center w-10/12 mx-auto lg:w-3/4 xl:w-1/2">
            <svg className="w-full" viewBox="0 0 845 183" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path
                d="M121.5 137C56.3 127.4 13.3333 163.333 0 182.5H845C829.4 141.3 764.5 135 734 137C706.4 68.1998 623.833 71.9994 586 82.4993C508 82.4993 454.167 27.4998 437 0C377.8 78 307.333 87.4995 279.5 82.4993C187.9 55.6993 136 107.666 121.5 137Z"
                fill={styles?.TitleBgColor || "#007369"}
              />
            </svg>
            {/* Conditional Border Design */}
            {!border || border === "Border_1" ? (
              <>
                <img src="/assets/megaoffers/flower.png" alt=""
                  className="absolute -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 w-14 lg:w-28 animate-infinite animate-wiggle-more animate-duration-[4s] z-10"
                />
                <img
                  src="/assets/megaoffers/flower.png"
                  alt=""
                  className="absolute -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 w-14 lg:w-28 animate-infinite animate-wiggle-more animate-duration-[4s] z-10"
                />
              </>
            ) : border === "Border_2" ? (
              <>
                <img
                  src="/assets/topdiscount/rangoli 64.png"
                  alt=""
                  className="absolute  -bottom-5 -left-5 lg:-bottom-10 lg:-left-10 w-14 lg:w-28 animate-infinite animate-wiggle-more animate-duration-[4s] z-10"
                />
                <img
                  src="/assets/topdiscount/rangoli 64.png"
                  alt=""
                  className="absolute  -bottom-5 -right-5 lg:-bottom-10 lg:-right-10 w-14 lg:w-28 animate-infinite animate-wiggle-more animate-duration-[4s] z-10"
                />
              </>
            ) : null}
            <h1
              className={`absolute z-10 xsm:text-2xl -translate-y-1 sm:-translate-y-3 sm:text-4xl xl:text-4xl 3xl:text-6xl font-agbalumo text-center`}
              style={{ color: styles?.TitleColor || "#FFFFFF" }}
            >
              {styles?.Title || "Daily Deals"}
            </h1>
          </div>

          {/* Inner Content */}
          <div>
            <DealSwiper Deals={Deals} styles={styles} />
          </div>
        </div>
      </section>
    </>
  );
}
