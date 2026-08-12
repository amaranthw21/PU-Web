import Navbar from "./Navbar";
import Frame from "./Frame";
import ScrollToTop from "./ScrollToTop";
import { Outlet } from "react-router-dom";


export default function Layout() {

    return (
        <>
            {/* No pinta nada: reposiciona el scroll al cambiar de página. */}
            <ScrollToTop />

            <Navbar />

            <div className="frame-container">

                <main className="container">

                    <div className="background-overlay">
                        <Outlet />
                    </div>

                </main>

                <Frame />

            </div>
        </>
    );
}