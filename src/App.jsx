import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Worlds from "./pages/Worlds";
import Species from "./pages/Species";
import SpeciesDetail from "./pages/SpeciesDetail";
import Factions from "./pages/Factions";
import FactionDetail from "./pages/FactionDetail";
import FactionSubDetail from "./pages/FactionSubDetail";
import Credits from "./pages/Credits";
import Rulesbook from "./pages/rulesbook/Rulesbook";
import RuleChapter from "./pages/rulesbook/RuleChapter";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

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


// Items Page

import Items from "./pages/items/Items";
import ItemDetail from "./pages/items/ItemDetail";


// En GitHub Pages el sitio cuelga de "/PU-Web/"; el router necesita ese
// prefijo como basename (en dev, BASE_URL es "/").
const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";


function App() {

    return (

        <BrowserRouter basename={basename}>
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
                        path="/species/:id"
                        element={<SpeciesDetail />}
                    />

                    <Route
                        path="/factions"
                        element={<Factions />}
                    />

                    <Route
                        path="/factions/:id"
                        element={<FactionDetail />}
                    />

                    <Route
                        path="/factions/:id/:factionId"
                        element={<FactionSubDetail />}
                    />

                    <Route
                        path="/rulesbook"
                        element={<Rulesbook />}
                    />

                    <Route
                        path="/rulesbook/:id"
                        element={<RuleChapter />}
                    />

                    <Route
                        path="/credits"
                        element={<Credits />}
                    />

                    <Route
                        path="/search"
                        element={<Search />}
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


                    {/* Items */}

                    <Route
                        path="/lore/items"
                        element={<Items />}
                    />

                    <Route
                        path="/lore/items/:id"
                        element={<ItemDetail />}
                    />


                    {/* Cualquier otra dirección. Va la última: solo entra si no
                        ha coincidido ninguna de arriba. Dentro del Layout, para
                        que conserve la barra y el marco. */}
                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}


export default App;