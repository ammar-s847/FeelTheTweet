import "./MainItem.css";
import {useState, useEffect} from "react";

function MainItem(props) {
    const [scoreColor, setScoreColor] = useState();

    useEffect(() => { 
        switch (props.score_name) {
            case "Very Positive":
                setScoreColor("green");
                break;
            case "Positive":
                setScoreColor("green");
                break;
            case "Very Negative":
                setScoreColor("red");
                break;
            case "Negative":
                setScoreColor("red");
                break;
            default:
                setScoreColor("blue");
        }
    }, []);
    
    return (
        <div className="MainItem">
            <div style={{border: "2px solid black"}}>
                <h2>{props.keyword}</h2>
            </div>
            <div>
                <p><b style={{color: scoreColor, fontSize: 20}}>{props.score_name}</b> | {props.quantity} tweets since {props.since}</p>
            </div>
        </div>
    ); 
    // <p>{props.keyword} {props.score} {props.score_name} {props.since} {props.quantity}</p>
    // <p>{props.data[0]} {props.data[1]} {props.data[2]} {props.data[3]} {props.data[4]}</p>
}

export default MainItem;