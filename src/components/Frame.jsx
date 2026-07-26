import "./Frame.css";

import TL from "../assets/frame/sector1.svg";
import T  from "../assets/frame/sector2.svg";
import TR from "../assets/frame/sector3.svg";

import L  from "../assets/frame/sector4.svg";
import C  from "../assets/frame/sector5.svg";
import R  from "../assets/frame/sector6.svg";

import BL from "../assets/frame/sector7.svg";
import B  from "../assets/frame/sector8.svg";
import BR from "../assets/frame/sector9.svg";

export default function Frame() {

    return (
        <div className="frame">

            <img className="tl" src={TL}/>

            <div className="t"></div>

            <img className="tr" src={TR}/>


            <div className="l"></div>

            <div className="r"></div>


            <img className="bl" src={BL}/>

            <div className="b"></div>

            <img className="br" src={BR}/>

        </div>
    )
}