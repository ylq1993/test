import React from 'react';
import axios from 'axios-jsonp-pro';

export class IdCardDemo extends React.Component {
  constructor(props) {
    super(props);
  }

  connet_device() {}
  /** 创建读卡器对象 */
  create_device() {}
  /** 读身份证逻辑 */
  async get_info() {}

  stop_device() {}

  render() {
    return null;
  }
}

const idCard = new IdCardDemo();
export default idCard;
