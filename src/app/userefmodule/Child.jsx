import { memo } from "react";

function Child({ logMessage }) {
  console.log("Child Component Rendered!");
  return <button onClick={logMessage}>Click Me</button>;
}

export default memo(Child);
