import React from 'react';

const Forms_Header = () => {
    return (
        <React.Fragment>
            <nav className={`fixed-top`} style={{zIndex: 1}}>
                <a href="/" className='img'>
                    <img className="logo" src='/images/AeoTrans.png' alt="logo"/>
                </a>
            </nav>
        </React.Fragment>
    )
}
export default Forms_Header;