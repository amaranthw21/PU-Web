import { Link } from "react-router-dom";
import asset from "../lib/asset";


export default function CountryCard({ country, link }) {

    return (

        <Link to={link} className="country-card">

            {
                country.flag
                    ? <img
                          className="country-card__img"
                          src={asset(country.flag)}
                          loading="lazy"
                          alt={`Flag of ${country.name}`}
                          onError={e => { e.currentTarget.style.display = "none"; }}
                      />
                    : <span className="country-card__placeholder">
                          {country.name.charAt(0)}
                      </span>
            }


            <div className="country-card__body">

                <h3>
                    {country.name}
                </h3>

            </div>

        </Link>

    );

}
