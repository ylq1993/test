import React, { useState, createRef, useEffect } from 'react';
import '@alifd/next/dist/next.css';
import Input from '@alifd/next/lib/input';

import getIsvModule from '../devices/idCard';
import { safe_render_dom_method } from '../util';

export default function IdCard() {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [idCardModule, setIdCardModule] = useState();
  let interval;

  useEffect(() => {
    getModuleData();
  }, []);

  const getModuleData = async () => {
    try {
      // const data = await getIsvModule('10201_gpy');
      setIdCardModule(getIsvModule);
    } catch (error) {
      throw error;
    }
  };

  const __queryIdCard = async () => {
    interval = setInterval(async () => {
      const info = await idCardModule.get_info();

      if (info) {
        clearInterval(interval);

        setCardName(info.cardName);
        setCardNumber(info.cardNumber);
      }
    }, 2000);
  };

  return (
    <div style={{ display: 'inline-block' }}>
      <div
        onClick={() => __queryIdCard()}
        style={{
          backgroundColor: '#33a0e5',
          margin: '30px',
          padding: '4px',
          color: '#fff',
        }}
      >
        启动读卡器
      </div>
      {safe_render_dom_method(idCardModule)('create_device')}
      <Input label='姓名' value={cardName} style={{ marginRight: '20px' }} />
      <Input label='身份证号码' value={cardNumber} />
    </div>
  );
}
