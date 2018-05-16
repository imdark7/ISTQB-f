class ExamContent extends React.Component {
    constructor(props) {
        super(props);
        this.nextQuestionHandler = this.nextQuestionHandler.bind(this);
        this.questionHandler = this.questionHandler.bind(this);
        this.selectAnswerHandler = this.selectAnswerHandler.bind(this);
        this.endExamHandler = this.endExamHandler.bind(this);
        var data = JSON.parse(this.props.data);
        var answered = new Map();
        for (let i = 0; i < 40; i++) {
            answered.set(i, null);
        }
        var timeLeft = data.isNativeLanguage ? 60 : 75;
        this.state = {
            questionsData: data,
            question: data.questions[0],
            currentId: 0,
            examIsOver: false,
            answered: answered,
            timeLeft: timeLeft,
            language: data.language,
            correctAnswers: 0,
            timer: null
        }
    }
    nextQuestionHandler(number) {
        var nextNumber = number === 39 ? 0 : number + 1;
        this.setState({
            question: this.state.questionsData.questions[nextNumber],
            currentId: nextNumber
        });
    }
    selectAnswerHandler(answerId) {
        if (!this.state.examIsOver) {
            var answers = this.state.answered;
            answers.set(this.state.currentId, answerId);
            this.setState({
                answered: answers
            });
        }
    }
    questionHandler(number, previous) {
        if (number == undefined) {
            number = this.state.currentId === 39 ? 0 : this.state.currentId + 1;
            previous = this.state.currentId;
        }
        this.setState({
            question: this.state.questionsData.questions[number],
            currentId: number
        });
        document.getElementById(`question-${number}`).style.background = "#f2f27c";
        let color = "#fd6161";
        if (!this.state.examIsOver) {
            if (this.state.answered.get(previous) != null) {
                color = "#a3c0ff";
            } else {
                color = null;
            }
        } else {
            if (this.state.answered.get(previous) ===
                this.state.questionsData.questions[previous].answers.find(a => a.isCorrect).id) {
                color = "#61fd7b";
            }
        }
        document.getElementById(`question-${previous}`).style.background = color;
    }
    endExamHandler() {
        var correctAnswers = 0;
        for (var i = 0; i < 40; i++) {
            let color = "#fd6161";
            if (this.state.answered.get(i) != null) {
                var id = this.state.answered.get(i);
                if (this.state.questionsData.questions[i].answers.find(a => a.isCorrect).id === id) {
                    color = "#61fd7b";
                    correctAnswers += 1;
                }
            }
            document.getElementById(`question-${i}`).style.background = color;
        }
        this.setState({
            examIsOver: true,
            correctAnswers: correctAnswers,
            timeLeft: 0
        });
        document.getElementById("result").style.display = "block";
        document.getElementById("endExam").style.display = "none";
        document.getElementById("repeatExamWrapper").style.display = "block";
    }
    componentDidMount() {
        let timer = setInterval(() => {
            var timeLeft = this.state.timeLeft - 1;
            if (timeLeft <= 0) {
                clearInterval(timer);
                if (!this.state.examIsOver) {
                    alert("Время вышло");
                }
                this.endExamHandler();
            }
            this.setState({
                timeLeft: timeLeft
            });
        }, 60 * 1000);
    }
    render() {
        return (
            <div>
                <div id="settings-block" style={{ width: "163px", padding: 0, display: "inline-block", verticalAlign: "top"}}>
                    <OrganizerBlock
                        questionHandler={this.questionHandler}
                        endExamHandler={this.endExamHandler}
                        answered={this.state.answered}
                        currentId={this.state.currentId}
                        timeLeft={this.state.timeLeft}
                        correctAnswers={this.state.correctAnswers}
                    />
                </div>
                <div id="content-block" className="content-block" style={{ marginLeft: "10px" }}>
                    <QuestionBlock
                        key={this.state.question.id}
                        questionHandler={this.questionHandler}
                        selectAnswerHandler={this.selectAnswerHandler}
                        checkedId={this.state.answered.get(this.state.currentId)}
                        language={this.state.language}
                        question={this.state.question}
                        examIsOver={this.state.examIsOver}
                        isExam={true}
                    />
                </div>
            </div>
        );
    }
}

