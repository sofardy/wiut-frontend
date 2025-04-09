import React from 'react';
import AboutApp from '../components/aboutApp';
import CheapProducts from '../components/cheapProducts';
import Discounts from '../components/discounts';
import MainComp from '../components/main';
import PopularProducts from '../components/popularProducts';
import Stores from '../components/stores';

const MainPage = () => {

    return(
        <div>
            <MainComp />
            <PopularProducts />
            <CheapProducts />
            <Discounts />
            <Stores />
            <AboutApp />
        </div>
    )
}
export default MainPage;