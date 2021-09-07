import { useState, useEffect } from "react";

const FakeSuspense = (props: any) => {
  const { children, delay, fallback } = props;
  const [isShown, setIsShown] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, delay);
  }, [delay]);

  return isShown ? children : fallback;
}

export default FakeSuspense;