import { Link } from "react-router-dom";
import Card from "../../components/Card";


export default function EnergyPowers(){

    return (

        <div>

            <nav className="breadcrumb">
                <Link to="/lore">Lore</Link>
                <span className="breadcrumb__sep">/</span>
                <span className="breadcrumb__current">Mechanics</span>
            </nav>

            <h1 className="page-title">
                Mechanics
            </h1>


            <div className="grid">

                <Card
                    title="Energy"
                    description="Information about the different energy sources."
                    link="/lore/energy-powers/energy"
                />

                <Card
                    title="Powers"
                    description="Information about the different types of powers."
                    link="/lore/energy-powers/powers"
                />

                <Card
                    title="Transformations"
                    description="Information about transformations."
                    link="/lore/energy-powers/transformations"
                />

            </div>

        </div>

    );

}
