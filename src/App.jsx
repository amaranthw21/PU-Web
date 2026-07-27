import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Worlds from "./pages/Worlds";
import Species from "./pages/Species";
import Factions from "./pages/Factions";
import Credits from "./pages/Credits";

// Worlds
import WorldPage from "./pages/worlds/WorldPage";
import CountryDetail from "./pages/worlds/CountryDetail";


// [LORE SECTION]

import Lore from "./pages/Lore";

// Gods Page
import Gods from "./pages/gods/Gods";
import GodDetail from "./pages/gods/GodDetail";


// Mechanics & Transformations Page

import EnergyPowers from "./pages/energy-powers/EnergyPowers";

import Energy from "./pages/energy-powers/energy/Energy";
import EnergyDetail from "./pages/energy-powers/energy/EnergyDetail";

import Powers from "./pages/energy-powers/powers/Powers";
import PowersDetail from "./pages/energy-powers/powers/PowersDetail";

import Transformation from "./pages/energy-powers/transformations/Transformation";
import TransformationDetail from "./pages/energy-powers/transformations/TransformationDetail";


function App() {

    return (

        <BrowserRouter>
            <Routes>

                <Route element={<Layout />}>

                    {/* Main Pages */}

                    <Route 
                        path="/" 
                        element={<Home />} 
                    />

                    <Route
                        path="/worlds"
                        element={<Worlds />}
                    />

                    <Route
                        path="/worlds/:worldId"
                        element={<WorldPage />}
                    />

                    <Route
                        path="/worlds/:worldId/:countryId"
                        element={<CountryDetail />}
                    />

                    <Route
                        path="/species"
                        element={<Species />} 
                    />

                    <Route 
                        path="/factions" 
                        element={<Factions />} 
                    />

                    <Route 
                        path="/credits" 
                        element={<Credits />} 
                    />


                    {/* Lore */}

                    <Route 
                        path="/lore" 
                        element={<Lore />} 
                    />


                    {/* Gods */}

                    <Route 
                        path="/lore/gods" 
                        element={<Gods />} 
                    />

                    <Route 
                        path="/lore/gods/:id" 
                        element={<GodDetail />} 
                    />


                    {/* Mechanics */}

                    <Route 
                        path="/lore/energy-powers" 
                        element={<EnergyPowers />} 
                    />


                    {/* Energy */}

                    <Route 
                        path="/lore/energy-powers/energy" 
                        element={<Energy />} 
                    />

                    <Route 
                        path="/lore/energy-powers/energy/:id" 
                        element={<EnergyDetail />} 
                    />


                    {/* Powers */}

                    <Route 
                        path="/lore/energy-powers/powers" 
                        element={<Powers />} 
                    />

                    <Route 
                        path="/lore/energy-powers/powers/:id" 
                        element={<PowersDetail />} 
                    />


                    {/* Transformations */}

                    <Route 
                        path="/lore/energy-powers/transformations" 
                        element={<Transformation />} 
                    />

                    <Route 
                        path="/lore/energy-powers/transformations/:id" 
                        element={<TransformationDetail />} 
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}


export default App;