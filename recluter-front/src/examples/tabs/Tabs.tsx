import React from 'react';
import { Row, Col } from 'antd';
import TabsUser from '../../components/tabs/Tabs';


const App: React.FC = () => {
    return (
        <div className="app-container">
        <Row gutter={[16, 16]}>
            <Col xs={24}>
                <TabsUser />
            </Col>
        </Row>
        </div>
    );
};

export default App;
