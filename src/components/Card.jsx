import { Link } from "react-router-dom";
import Paragraphs from "./Paragraphs";


export default function Card({ title, description, link }) {

    return (

        <div className="card">

            <h2>
                {title}
            </h2>


            <Paragraphs text={description} />


            {
                link && (

                    <Link to={link}>
                        Explore →
                    </Link>

                )
            }

        </div>

    );

}