import React from 'react'

const TopBanner = () => {

    const divStyle = {
        backgroundImage: 'linear-gradient(221deg, #b17efd, #8baafc, #97bdfb)',
        backgroundSize: '100% 100%',
    };

    // will fetch top banner content from the database later

    return (
        <div className=''>
            <div className='flex items-center justify-center text-xs py-2.5 text-white' style={divStyle}>
                <h1 className='hover:text-black transition-all duration-300'>🤖 Search 4,000+ AI tools Ask our bot for help →</h1>
            </div>
        </div>
    )
}

export default TopBanner
