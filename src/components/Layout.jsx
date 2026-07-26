import Navbar from "./Navbar";
import Frame from "./Frame";
import { Outlet } from "react-router-dom";


export default function Layout() {

    return (
        <>
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