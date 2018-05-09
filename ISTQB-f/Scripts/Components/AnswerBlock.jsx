class AnswerBlock extends React.Component {
    render() {
        var radioDisabled = "";
        if (this.props.examIsOver) {
            radioDisabled = "disabled";
        }
        return (
            <div style={{ display: "block", background: this.props.bgColor }} id={`answ-${this.props.id}`}>
                <span style={{ verticalAlign: "middle" }}>
                    {this.props.checked ?
                        <input
                            id={this.props.id}
                            type="radio"
                            className="radio-margin align-center"
                            name="AnswerRadio"
                            style={{ float: "left", width: "25px", marginRight: "-36px", marginTop: "7px" }}
                            onClick={() => this.props.selectAnswerHandler(this.props.id)}
                            defaultChecked
                            disabled={radioDisabled}
                        /> :
                        <input
                            id={this.props.id}
                            type="radio"
                            className="radio-margin align-center"
                            name="AnswerRadio"
                            style={{ float: "left", width: "25px", marginRight: "-36px", marginTop: "7px" }}
                            onClick={() => this.props.selectAnswerHandler(this.props.id)}
                            disabled={radioDisabled}
                        />
                    }
                </span>
                <label htmlFor={this.props.id} style={{ marginLeft: "36px", fontSize: "18px" }}>{this.props.answerText}</label>
            </div>
        );
    }
};