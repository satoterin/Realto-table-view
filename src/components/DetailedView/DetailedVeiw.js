// Import Styles
import "./DetailedView.css"

const DetailedView = (props) => {
    const { data } = props;

    return (
        <div className="detailed-view-container">
            <div className="detailed-view-content-wrapper">
                <div className="flex-row justify-center align-center">
                    <h2 className="flex-grow-1"> Detailed View of Row # {data.id} </h2>
                    <button className="close-btn" onClick={() => props.close()}>x</button>
                </div>
                <div className="flex-col">
                    <p>ID - {data.id}</p>
                    <p>Email - {data.email}</p>
                    <p>First Name - {data.first_name}</p>
                    <p>Last Name - {data.last_name}</p>
                    <p>Avatar - {data.avatar}</p>
                </div>
            </div>
        </div>
    )
}

export default DetailedView