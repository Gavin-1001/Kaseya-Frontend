import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="container">
        <div className="col-md-12 text center">
            <span className='display-1'>401</span>
                <div className="mb-4 lead">
                    We can't seem to find what you're looking for!!
                </div>
                {/*Add a return to home button or something */}
                <Link to="/home" className="btn btn-link">
                    Back to home
                </Link>
        </div>
    </div>
  )
}

export default NotFound