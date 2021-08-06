import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const Layout = ({children}) => {
    return (
        <div>
            <div className="wrapper">
                <Navbar />
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout