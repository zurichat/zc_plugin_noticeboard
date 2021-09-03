import React from 'react'

import "./Header.css"

const Header = () => {
    return (
        <header className='header'>
            <div className='header__left-container'>
                <form className='header__form'>
                    <input className='header__form-input' type='text' placeholder='Search your workspace' />
                </form>
            </div>
            <div className='header__right-container'>
                <div className='header__settings'>
                    <img className='header__setiings-icon' src='' />
                </div>
                <div className='header__profile'>
                    <img className='header__profile-image' src='' />
                </div>  
            </div>
        </header>
    )
}

export default Header
