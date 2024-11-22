import React from 'react';
import { Layout  } from 'antd';
import CheckboxComponent from '../../components/checkbox/Checkbox';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Content style={{ padding: '10px' }}>
        <CheckboxComponent  
        />
      </Content>
    </Layout>
  );
};

export default App;