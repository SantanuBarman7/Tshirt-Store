import React from 'react';
import Menu from './menu'

const Base = ({
    title='My Title',
    description='My description',
    className='bg-dark text-white p-4',
    children
}) => (
    
        <div>
            <Menu />
            <div className='container-fluid'>
                <div className='jumbotron bg-dark text-white text-center'>
                    <h2 className='display-4 bg-success'>{title}</h2>
                    <p className='lead'>{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className='footer bg-info mt-auto py-1'>
                <div className='container-fluid bg- text-white text-center py-1'>
                    <h4>If you got any questions, feel free to reach out!</h4>
                    <button className='btn btn-warning btn-lg'>Contact Us</button>
                </div>
                <div className='container'>
                    <span className='text-muted'>
                        An Amazing place to buy <span className='text-white text-centre' >Tshirt</span>
                    </span>
                </div>
            </footer>
        </div>
)

export default Base;