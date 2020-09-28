import React from 'react'
import './StyledLoader';

function Loader() {
    return (
        <div>
            <img 
                src={require('./FP-Symbol_09-27.gif')} 
                alt='' 
                style={{
                    paddingLeft: '45%',
                    width: '50%'
                    }}
            />
        </div>
    )
}

export default Loader
