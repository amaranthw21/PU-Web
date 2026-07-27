import { mainFactions, sideFactions } from "../data/factions";
import FactionCard from "../components/FactionCard";


export default function Factions() {

    return (

        <div>

            <h1 className="page-title">
                Factions
            </h1>


            <section className="gods-section">

                <h2 className="worlds-heading">
                    Main Factions
                </h2>

                <div className="grid faction-grid">

                    {
                        mainFactions.map(faction => (
                            <FactionCard key={faction.id} faction={faction} />
                        ))
                    }

                </div>

            </section>


            <hr className="section-divider" />


            <section className="gods-section">

                <h2 className="worlds-heading">
                    Other Dimensions
                </h2>

                <div className="grid faction-grid">

                    {
                        sideFactions.map(faction => (
                            <FactionCard key={faction.id} faction={faction} />
                        ))
                    }

                </div>

            </section>

        </div>

    );

}
