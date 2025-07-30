import React from 'react'
import { Link } from 'react-router-dom'

const Initial = () => {
  return (
    <div>
      <button>
        <Link to="/login">
          Login
        </Link>
      </button>
      <button>
        <Link to="/signup">
          signup
        </Link>
      </button>
    </div>
  )
}

export default Initial
