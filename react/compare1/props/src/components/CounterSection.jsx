import React from "react";
import Counter from "./Counter";

export default function CounterSection({
  count,
  decrementCount,
  resetCount,
  incrementCount,
}) {
  return (
    <section className="section">
      <h2> 🏁 카운터</h2>
      <Counter
        count={count}
        incrementCount={incrementCount}
        decrementCount={decrementCount}
        resetCount={resetCount}
      />
    </section>
  );
}
