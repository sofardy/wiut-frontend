import { Col, Row } from "antd";
import React from "react";
import { BsApple } from "react-icons/bs";
import { DiAndroid } from "react-icons/di";
import { MdOutlineQrCode2 } from "react-icons/md";
import AboutAppImg from '../../assets/images/about-app.svg'
const AboutApp = () => {
  return (
    <div className="container">
      <div className="main-contex1 about-app-wrapper">
        <Row gutter={{ xs: 8, sm: 16, md: 10, lg: 40, xl: 80, xxl: 100}}>
          <Col xl={9} lg={10} md={16} span={24}>
            <h5 className="mb-4 fw-bold">Выгодные предложения всегда рядом </h5>
            <p className="">
              Узнавайте первыми о выгодных предложениях в приложении Price
              Hunter
            </p>
            <div className="row">
              <div className="col-6">
                <div className="app-store-card">
                  <div className="d-flex justify-content-start align-items-center">
                    <BsApple className="brand-logo" />
                    <div>
                      <span>Загрузите в</span>
                      <p className="mb-0">App Store</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="app-store-card">
                  <div className="d-flex justify-content-start align-items-center">
                    <DiAndroid className="brand-logo" />
                    <div>
                      <span>Доступно в</span>
                      <p className="mb-0">Google Play</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xl={7} lg={6} md={8} sm={6} span={7}>
            <img src={AboutAppImg} className='w-100' alt="" />
          </Col>
          <Col xl={8} lg={8} md={24} sm={18} span={17}>
            <div className="qr-code-map">
                <div className="d-flex justify-content-start align-items-center">
                    <MdOutlineQrCode2 className="qr-code" />
                    <div className="ps-">
                        <p>Наведи камеру на QR код <br /> чтобы скачать приложение</p>
                    </div>
                </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default AboutApp;
