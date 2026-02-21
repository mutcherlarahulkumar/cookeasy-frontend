import { useState } from "react";

// interface HomePageHooksProps {
//   initialCount?: number;
// }

interface HomePageHooks {
  count: number;
  increment: () => void;
}

export const useHomePageHooks = (): HomePageHooks => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return { count, increment };
};
