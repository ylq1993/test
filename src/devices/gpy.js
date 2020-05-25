import React from 'react';

export class JangGanGP extends React.Component {
  constructor(props) {
    super(props);
  }

  /** 开启设备 */
  start_device() {}
  /** 关闭设备 */
  stop_device() {}
  /** 打开视频，可选 */
  start_video() {}
  /** 关闭视频，可选 */
  stop_video() {}
  /** 拍照 */
  capture() {}
  /** 创建设备实例 */
  create_instnce() {}
  /** 创建视频实例 */
  create_view() {}

  render() {
    return null;
  }
}

const gpy = new JangGanGP();
export default gpy;
