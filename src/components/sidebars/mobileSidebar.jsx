import React, { useEffect, useState } from 'react';
import useWindowSize from '../../hooks/useWindowSize';
import { NavLink } from 'react-router-dom'
import useScrollTop from '../../hooks/useScrollTop';

const MobileSidebar = ({isOpen, setIsOpen}) => {

    const {width} = useWindowSize()
    const scrollPosition = useScrollTop()
    const [rightS, setRightS] = useState({right:"20%"})
    const [blur, setblur] = useState({right:"0%"})

    useEffect(() => {
        if(isOpen){
            setTimeout(() => {
                setblur({right:"0%"})
            }, 200)
        }else{
            setTimeout(() => {
                setblur({right:"100%"})
            }, 200)
        }
    }, [isOpen])

    useEffect(() => {
        if(!isOpen){
            document.body.style.overflow = "auto";
        }else{
            document.body.style.overflowY = "hidden"
        }
    }, [isOpen])
    
    useEffect(() => {
        if(width > 576 && width < 768){
            setRightS({right:"40%"})
        }else if(width > 768){
            setRightS({right:"50%"})
        }else{
            setRightS({right:"20%"})
        }
    }, [width])


    return(
        <div>
            <div className={scrollPosition > 100 ? "bg-blur p-3 sidebar-top" : "bg-blur p-3"} onClick={() => setIsOpen(false)} style={blur}></div>
            <div className={scrollPosition > 100 ? "sidebar-wrapper p-3 sidebar-top" : "sidebar-wrapper p-3"} style={!isOpen ? {right:"100vw"} : rightS}>
                <div className='d-flex align-items-start flex-column bd-highlight' style={{height:"100%"}} >
                    <NavLink className={({isActive}) => isActive ? "mb-0 header-text active-link d-inline-block my-3 bd-highlight" : "mb-0 bd-highlight header-text d-inline-block my-3" } to='/selected-products' style={{whiteSpace: "nowrap"}}>Популярные продукты</NavLink><br />
                    <NavLink className={({isActive}) => isActive ? "header-text active-link d-inline-block bd-highlight" : "bd-highlight header-text d-inline-block" } to='/offer-products' style={{whiteSpace: "nowrap"}}>Выгодные предложения</NavLink>
                    <button className='bd-highlight py-2 mt-auto' >Зарегистрироваться</button>
                    <button className='bd-highlight py-2 mb-5 mt-3' >Войти</button>
                </div>
            </div>
        </div>
    )
}
export default MobileSidebar;