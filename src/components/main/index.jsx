import React from 'react';
import {BiUser} from 'react-icons/bi'
import { Button } from 'antd';

const MainComp = () => {

    return(
        <div className="container">
            <div className='text-center main-comp-wrapper main-contex' >
                <h3>Мы помогаем сохранить ваши деньги</h3>
                <div className='images_wrap'>
                    <div className="row">
                        <div className="col-md-4">
                            <img className='w-100 img-ht-100' src={require("../../assets/images/phone.jpg")} alt="" />
                        </div>
                        <div className="col-md-4">
                            <img className='img-ht-50' src={require("../../assets/images/phone.jpg")} alt="" />
                            <img className='img-ht-50' style={{marginTop:"30px"}} src={require("../../assets/images/phone.jpg")} alt="" />
                        </div>
                        <div className="col-md-4">
                            <div className='my-card text-center d-flex align-items-center flex-column bd-highlight'>
                                <BiUser className='user-icon bd-highlight' />
                                <p className='bd-highlight m-auto'>Чтобы получать уведомления о снижении цен на все категории товаров, вам необходимо зарегистрироваться</p>
                                <Button className='w-100 bd-highlight'>Зарегистрироваться</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MainComp;