import React, { useState, createRef, useEffect } from "react";
import "@alifd/next/dist/next.css";
import Dialog from "@alifd/next/lib/dialog";
import "react-app-polyfill/ie11";

import getIsvModule from "../devices/gpy";

export default function JangGanGP() {
  const [visible, setVisible] = useState(false);
  const [deviceInstance, setDeviceInstance] = useState();

  useEffect(() => {
    getModuleData();
  }, []);

  useEffect(() => {
    if (visible) {
      try {
        start_device();
      } catch (error) {
        // Message.error('未找到控件，请重新安装' + JSON.stringify(error || {}));
        alert("未找到控件，请重新安装" + JSON.stringify(error || {}));
      }
    } else {
      stop_device();
    }
  }, [visible]);

  async function getModuleData() {
    try {
      // const data = await getIsvModule('10201_gpy');
      setDeviceInstance(getIsvModule);
    } catch (error) {
      throw error;
    }
  }

  function safe_call_instance_method(instance) {
    return function (name) {
      instance && instance[name] && instance[name]();
    };
  }

  function safe_render_dom_method(instance) {
    return function (name) {
      if (instance && instance[name]) {
        return instance[name]();
      } else {
        return null;
      }
    };
  }

  function start_device() {
    safe_call_instance_method(deviceInstance)("start_device");
  }

  function stop_device() {
    safe_call_instance_method(deviceInstance)("stop_device");
  }

  function capture() {
    safe_call_instance_method(deviceInstance)("capture");
  }

  const __startGPY = () => {
    setVisible(true);
  };

  const __onClose = () => {
    setVisible(false);
    stop_device();
  };

  return (
    <div style={{ display: "inline-block" }}>
      <div
        onClick={() => __startGPY()}
        style={{
          backgroundColor: "#33a0e5",
          height: "60px",
          width: "300px",
          textAlign: "center",
          lineHeight: "60px",
          color: "#fff",
        }}
      >
        启动高拍仪
      </div>
      {safe_render_dom_method(deviceInstance)("create_view")}
      <Dialog
        title="采集照片"
        visible={visible}
        onOk={capture}
        onCancel={stop_device}
        footerAlign={"center"}
        footerActions={["ok", "cancel"]}
        okProps={{ children: "采集" }}
        cancelProps={{ children: "关闭" }}
        onClose={__onClose}
        height={"426px"}
      >
        <div
          style={{
            width: "550px",
            height: "270px",
            border: "1px solid black",
            float: "left",
          }}
        >
          <div style={{ width: "99%", height: "99%" }}>
            {safe_render_dom_method(deviceInstance)("create_instnce")}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
