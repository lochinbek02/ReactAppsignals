import './Navbar.css'

function Navbar({handleLogout}) {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>SamTUIT</h1>
        </div>
        <div className="navbar-counter">
        <button className='logout' onClick={handleLogout}>Logout</button>
         {/* {UserListLength===0 ? <h3>No user :(</h3> : <h3>User Conunt: {UserListLength}</h3> } */}
        </div>
      </div>
    </div>
  )
}

export default Navbar