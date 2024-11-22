import React, { useState } from 'react';
import { Typography, Button, Checkbox, Space, Row, Col } from 'antd';
import Header from '../../../components/pages/principalNav/PrincipalNav';
import ArrowLine from '../../../assets/icons/ArrowLine.svg';
import ArrowA from '../../../assets/icons/ArrowA.svg';

const { Title, Paragraph } = Typography;

const TermsAndConditionsPage: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center mr-8">
      <Header />
      <div className=" w-full p-8">
        <Row gutter={[16, 16]}>
          <Col span={4}>
            <Space direction="vertical" size="middle">
              <Button type="link" className="text-left text-base">
                Lorem ipsum <img src={ArrowLine} alt="Arrow Line" />
              </Button>
              <Button type="link" className="text-left text-base">
                Lorem ipsum
              </Button>
              <Button type="link" className="text-left text-base">
                Lorem ipsum <img src={ArrowA} alt="Arrow A" />
              </Button>
              <Button type="link" className="text-left text-base">
                Lorem ipsum <img src={ArrowA} alt="Arrow A" />
              </Button>
            </Space>
          </Col>
          <Col span={20}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Title level={3} style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Términos y condiciones
              </Title>
              <Paragraph className="text-[16px] text-[#757575]">
                Lorem ipsum dolor sit amet consectetur. Congue eu libero diam amet amet tincidunt amet. Enim velit proin montes dolor 
                cras. Diam turpis metus elementum quis venenatis ut in vitae porta. Massa a erat viverra rhoncus vel in mattis aliquam nibh.
                Dignissim elementum netus adipiscing dolor. Commodo est at non sodales. Id ut egestas sapien malesuada at orci. Euismod amet pulvinar quam consectetur tellus.
                Proin ut vel odio dui metus condimentum lectus curabitur. Ut consectetur iaculis nulla interdum. Et vitae id amet sed tortor sodales et. Volutpat suscipit elit vestibulum amet. Mollis 
                enim et augue at tempus adipiscing. Dictumst est congue arcu enim aliquam vel ullamcorper nunc. Arcu maecenas consequat dolor facilisi.
                Lorem cras venenatis faucibus nisl arcu auctor tincidunt. Vitae maecenas suspendisse semper et. Diam in ut iaculis adipiscing neque elit sit.
                Tincidunt vehicula nibh aliquam massa magna convallis eget ornare. Pharetra lectus arcu venenatis id eu morbi tortor tortor. Elit commodo facilisis enim nulla.
                Sit ullamcorper urna sapien blandit. Adipiscing sit congue dolor potenti fermentum cras amet diam nullam. Dignissim volutpat tristique porttitor congue.
                Enim amet et at tortor. Nulla est venenatis sem sed magna netus ullamcorper et ullamcorper. Turpis nunc id volutpat tincidunt sagittis tortor mattis id feugiat.
                Pulvinar nibh commodo nec consequat mattis egestas vulputate tellus. Interdum enim sit nulla viverra est pulvinar euismod. Tortor eget ullamcorper dictum parturient. 
                Rutrum aliquet condimentum vitae fermentum scelerisque. Faucibus nec malesuada in neque amet. Placerat aliquet dignissim varius semper blandit. Nulla morbi ullamcorper ullamcorper metus pulvinar.
                Massa consequat massa blandit arcu gravida dictum feugiat ultricies. Diam amet pulvinar rutrum maecenas. Ac in lacus sed sollicitudin. Elementum nibh purus augue sagittis sed arcu at. 
                Lobortis sagittis tristique sed et quis mauris dictumst dui mi. Morbi diam mattis netus est quam vel eget. Pharetra risus nunc nulla in amet scelerisque. Et risus pulvinar proin senectus. 
                Nunc lectus sit justo tristique ultrices placerat odio metus amet. Turpis feugiat gravida tristique ornare tincidunt. Accumsan vitae turpis consectetur erat nulla mattis. 
                Magna massa ac lectus urna bibendum ullamcorper sit neque. Viverra elementum gravida leo id tincidunt vestibulum t
              </Paragraph>

              <Title level={3} style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Políticas de privacidad
              </Title>
              <Paragraph className="text-[16px] text-[#757575]">
              Lorem ipsum dolor sit amet consectetur. Congue eu libero diam amet amet tincidunt amet. Enim velit proin montes dolor 
                cras. Diam turpis metus elementum quis venenatis ut in vitae porta. Massa a erat viverra rhoncus vel in mattis aliquam nibh.
                Dignissim elementum netus adipiscing dolor. Commodo est at non sodales. Id ut egestas sapien malesuada at orci. Euismod amet pulvinar quam consectetur tellus.
                Proin ut vel odio dui metus condimentum lectus curabitur. Ut consectetur iaculis nulla interdum. Et vitae id amet sed tortor sodales et. Volutpat suscipit elit vestibulum amet. Mollis 
                enim et augue at tempus adipiscing. Dictumst est congue arcu enim aliquam vel ullamcorper nunc. Arcu maecenas consequat dolor facilisi.
                Lorem cras venenatis faucibus nisl arcu auctor tincidunt. Vitae maecenas suspendisse semper et. Diam in ut iaculis adipiscing neque elit sit.
                Tincidunt vehicula nibh aliquam massa magna convallis eget ornare. Pharetra lectus arcu venenatis id eu morbi tortor tortor. Elit commodo facilisis enim nulla.
                Sit ullamcorper urna sapien blandit. Adipiscing sit congue dolor potenti fermentum cras amet diam nullam. Dignissim volutpat tristique porttitor congue.
                Enim amet et at tortor. Nulla est venenatis sem sed magna netus ullamcorper et ullamcorper. Turpis nunc id volutpat tincidunt sagittis tortor mattis id feugiat.
                Pulvinar nibh commodo nec consequat mattis egestas vulputate tellus. Interdum enim sit nulla viverra est pulvinar euismod. Tortor eget ullamcorper dictum parturient. 
                Rutrum aliquet condimentum vitae fermentum scelerisque. Faucibus nec malesuada in neque amet. Placerat aliquet dignissim varius semper blandit. Nulla morbi ullamcorper ullamcorper metus pulvinar.
                Massa consequat massa blandit arcu gravida dictum feugiat ultricies. Diam amet pulvinar rutrum maecenas. Ac in lacus sed sollicitudin. Elementum nibh purus augue sagittis sed arcu at. 
                Lobortis sagittis tristique sed et quis mauris dictumst dui mi. Morbi diam mattis netus est quam vel eget. Pharetra risus nunc nulla in amet scelerisque. Et risus pulvinar proin senectus. 
                Nunc lectus sit justo tristique ultrices placerat odio metus amet. Turpis feugiat gravida tristique ornare tincidunt. Accumsan vitae turpis consectetur erat nulla mattis. 
                Magna massa ac lectus urna bibendum ullamcorper sit neque. Viverra elementum gravida leo id tincidunt vestibulum t
              </Paragraph>

              <div className="text-center">
                <Checkbox className="text-[16px] text-[#757575] mb-4" onChange={handleCheckboxChange}>
                  Confirmo que he leído y acepto los términos y condiciones de privacidad.
                </Checkbox>
              </div>

              <div className="flex justify-center space-x-20">
                <Button className="h-[44px] w-[118px] text-base font-semibold">Cancelar</Button>
                <Button className="h-[44px] w-[118px] bg-[#006497] text-base font-semibold" type="primary" disabled={!isChecked}>
                  Aceptar
                </Button>
              </div>
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
