import { useState, useEffect } from "react";

const useInfiniteScroll = (callback) => {
  console.log("usefinitescrool hook");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function isScrolling() {
    console.log("in isscrolling function");
    console.log("window.innerHeight",window.innerHeight);
    console.log("document.documentElement.scrollTop",document.documentElement.scrollTop);
    console.log("document.documentElement.offsetHeight",document.documentElement.offsetHeight);
    console.log("isFetching",isFetching);

    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;
    console.log("after scroll condition");
    setIsFetching(true);
  }

  useEffect(() => {
    console.log("isFetching", isFetching);
  }, [isFetching]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
