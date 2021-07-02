import "./MainItem.css";

function MainItem(props) {
    return (
        <>
            <p>{props.keyword} {props.score} {props.score_name} {props.since} {props.quantity}</p>
        </>
    );
}

export default MainItem;