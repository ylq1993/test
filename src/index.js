import React, { useState } from "react";
import ReactDOM from "react-dom";

import GPY from "./demo/gpy";
import DKQ from "./demo/idCard";

const HelloMessage = () => {
  const [isGPY, setGPY] = useState(null);

  const switchDevice = (type) => {
    setGPY(type === 0);
  };

  return (
    <div style={styles.content}>
      <h1 style={styles.btn} onClick={() => switchDevice(0)}>
        测试高拍仪
      </h1>
      <h1 style={styles.btn} onClick={() => switchDevice(1)}>
        测试读卡器
      </h1>
      {isGPY === null ? <div /> : isGPY ? <GPY /> : <DKQ />}
    </div>
  );
};

const styles = {
  content: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  btn: {
    height: "60px",
    width: "300px",
    lineHeight: "60px",
    textAlign: "center",
    borderRadius: "10px",
    backgroundColor: "#255bda",
    color: "#fff",
    marginTop: "20px",
  },
};

ReactDOM.render(<HelloMessage />, document.getElementById("container"));
