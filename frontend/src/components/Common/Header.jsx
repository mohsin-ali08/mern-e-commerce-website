import Topbar from "../Layout/Topbar"
import Navbar from "./Navbar"

function Header () {
    return (
     <header className="border-b border-gray-200">
        {/* Top bar */}
        <Topbar/>
        {/* Nav bar */}
        <Navbar/>   
        {/* Cart Drawer */}
     </header>
    )
}   

export default Header