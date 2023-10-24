import React from 'react';

const NotFoundPage = () => {
    const containerStyle = {
        padding: '40px 0',
        background: '#fff',
    };

    const bgStyle = {
        backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
        height: '400px',
        backgroundPosition: 'center',
    };

    const h1Style = {
        fontSize: '80px',
    };

    const h3Style = {
        fontSize: '80px',
    };

    const linkStyle = {
        color: '#fff!important',
        padding: '10px 20px',
        background: '#39ac31',
        margin: '20px 0',
        display: 'inline-block',
    };

    return (
        <section className="page_404 flex items-center justify-center" style={containerStyle}>
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-10 col-sm-offset-1 text-center">
                            <div className="four_zero_four_bg" style={bgStyle}>
                                <h1 className="text-center" style={h1Style}>404</h1>
                            </div>

                            <div className="contant_box_404">
                                <h3 className="h2" style={h3Style}>Looks like you're lost</h3>
                                <p>The page you are looking for is not available!</p>
                                <a href="/" style={linkStyle} className="link_404">Go to Home</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;
