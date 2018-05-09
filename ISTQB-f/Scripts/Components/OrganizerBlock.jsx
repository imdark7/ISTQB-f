class OrganizerBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            answered: this.props.answered,
            currentId: this.props.currentId,
            timeLeft: this.props.timeLeft,
            correctAnswers: 0
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            answered: nextProps.answered,
            currentId: nextProps.currentId,
            timeLeft: nextProps.timeLeft,
            correctAnswers: nextProps.correctAnswers
        });
    }
    componentDidMount() {
        document.getElementById('question-0').style.background = "#f2f27c";
    }
    render() {
        var list = [];
        for (let i = 0; i < 10; i++) {
            list.push(
                <tr style={{ width: "200px" }} key={`question-tr${i}`}>
                    <td
                        className="tableCell"
                        id={`question-${i}`}
                        onClick={() => this.props.questionHandler(i, this.state.currentId)}
                    >{i + 1}</td>
                    <td
                        className="tableCell"
                        id={`question-${10 + i}`}
                        onClick={() => this.props.questionHandler(10 + i, this.state.currentId)}
                    >{i + 11}</td>
                    <td
                        className="tableCell"
                        id={`question-${20 + i}`}
                        onClick={() => this.props.questionHandler(20 + i, this.state.currentId)}
                    >{i + 21}</td >
                    <td
                        className="tableCell"
                        id={`question-${30 + i}`}
                        onClick={() => this.props.questionHandler(30 + i, this.state.currentId)}
                    >{i + 31}</td >
                </tr>
            );
        }
        return (
            <div>
                <div>
                    <table style={{marginTop: "10px"}}>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
                <div>
                    <TimerDisplay timeLeft={this.state.timeLeft} />
                </div>
                <div>
                    <button
                        className="standart-size btn btn-default"
                        id="endExam"
                        onClick={() => this.props.endExamHandler()}
                        style={{ margin: "10px" }}
                    >Завершить</button>
                </div>
                <div id="result" style={{ display: "none" }}>
                    <ExamResult correctAnswers={this.state.correctAnswers} />
                </div>
                <div id="repeatExamWrapper" style={{ display: "none" }}>
                    <button
                        className="standart-size btn btn-default"
                        id="repeatExam"
                        onClick={() => window.location.reload()}
                        style={{ margin: "10px" }}
                    >Повторить</button>
                </div>
            </div>
        );
    }
}

class TimerDisplay extends React.Component {
    render() {
        if (this.props.timeLeft <= 0) {
            return null;
        }
        return <h4 style={{fontSize: "17px"}}>Осталось {this.props.timeLeft} минут</h4>;
    }
}

class ExamResult extends React.Component {
    render() {
        return (
            <div>
                <h4>Вы {this.props.correctAnswers > 25 ? "успешно" : "не"} сдали.</h4>
                <h4>Ваш результат:</h4>
                <h4>{this.props.correctAnswers} из 40 ({this.props.correctAnswers * 100 / 40}%)</h4>
            </div>
        );
    }
}