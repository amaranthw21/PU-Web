import { Link } from "react-router-dom";


export default function Card({ title, description, link }) {

    return (

        <div className="card">

            <h2>
                {title}
            </h2>


            <p>
                {description}
            </p>


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