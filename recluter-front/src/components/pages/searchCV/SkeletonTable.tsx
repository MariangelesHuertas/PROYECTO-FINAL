import React, { useState } from 'react';
import { DotChartOutlined } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Divider, Form, Radio, Skeleton, Space, Switch } from 'antd';

type SizeType = 'default' | 'small' | 'large';
type ButtonShapeType = 'circle' | 'square' | 'round' | 'default';
type AvatarShapeType = 'circle' | 'square';

const App: React.FC = () => {
  const [active, setActive] = useState(false);
  const [block, setBlock] = useState(false);
  const [size, setSize] = useState<SizeType>('default');
  const [buttonShape, setButtonShape] = useState<ButtonShapeType>('default');
  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>('circle');
  return (
    <>
      <Space>
        <Skeleton.Button active={active} shape={buttonShape} block={block} />
        <Skeleton.Input active={active} style={{ width:'25px' }}/>
        <Skeleton.Button active={active} shape={buttonShape} block={block} />
        <Skeleton.Input active={active} />
      </Space>
    </>
  );
};

export default App;