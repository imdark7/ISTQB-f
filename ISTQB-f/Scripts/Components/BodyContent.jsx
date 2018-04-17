class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.langHandler = this.langHandler.bind(this);
        this.randHandler = this.randHandler.bind(this);
        this.questionHandler = this.questionHandler.bind(this);
        this.translateHandler = this.translateHandler.bind(this);
        this.gotoHandler = this.gotoHandler.bind(this);
        this.state = {
            question: JSON.parse(this.props.question),
            language: "ru",
            strategy: "inline"
        }
    }
    gotoHandler() {
        let num = parseInt(document.getElementById("questionNumberInput").value);
        if (Number.isNaN(num)) {
            return;
        } else {
            fetch(`/Training/Next?id=${num}`,
                {
                    method: "GET",
                    dataType: "JSON",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                })
                .then((resp) => {
                    return resp.json();
                })
                .then((question) => {
                    this.setState({ question: question });
                    this.openTranslateForm(question);
                });
        }
    }
    langHandler() {
        this.setState({
            language: this.state.language === "ru" ? "en" : "ru"
        });
    }
    randHandler() {
        this.setState({
            strategy: this.state.strategy === "random" ? "inline" : "random"
        });
    }
    openTranslateForm(question) {
        ReactDOM.render(
            <div></div>,
            document.getElementById("trForm")
        );
        ReactDOM.render(
            <TranslateForm
                question={question}
                translateHandler={this.translateHandler}
            />,
            document.getElementById("trForm")
        );
    }
    questionHandler() {
        fetch(`/Training/Next?id=${this.state.question.id}&strategy=${this.state.strategy}`,
            {
                method: "GET",
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then((resp) => {
                return resp.json();
            })
            .then((question) => {
                this.setState({ question: question });
                this.openTranslateForm(question);
            });
    }
    translateHandler(data) {
        fetch(`/Training/SetTranlation?strategy=${this.state.strategy}`,
            {
                method: "POST",
                dataType: "JSON",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Accept": "application/json"
                },
                body: data
            })
            .then((resp) => {
                return resp.json();
            })
            .then((question) => {
                this.setState({ question: question });
                this.openTranslateForm(question);
            });
    }
    render() {
        return (
            <div>
                <table>
                    <tbody style={{ verticalAlign: "top" }}>
                        <tr>
                            <td id="settings-block" style={{ width: "200px", padding: 0 }}>
                                <SettingsBlock
                                    langHandler={this.langHandler}
                                    randHandler={this.randHandler}
                                    gotoHandler={this.gotoHandler}
                                    strategy={this.state.strategy}
                                />
                            </td>
                            <td id="content-block" style={{ width: "auto" }}>
                                <ContentBlock
                                    questionHandler={this.questionHandler}
                                    question={this.state.question}
                                    language={this.state.language}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <hr />
                <div id="trForm">
                    <TranslateForm
                        question={this.state.question}
                        translateHandler={this.translateHandler}
                    />
                </div>
            </div>
        );
    }
};

class TranslateForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            question: this.props.question
        }
    }
    handleClick() {
        var trData = this.state.question;
        trData.englishText = document.getElementById("questionEn").value;
        trData.russianText = document.getElementById("questionRu").value;
        for (var i = 0; i < trData.answers.length; i++) {
            let id = trData.answers[i].id;
            trData.answers[i].englishText = document.getElementById("answerEn" + id).value;
            trData.answers[i].russianText = document.getElementById("answerRu" + id).value;
        }
        this.props.translateHandler(JSON.stringify(trData));
    }
    render() {
        return (
            <div>
                <div id="translateForm">
                    <div className="row row-question">
                        <TextAreaAutosize
                            myId="questionEn"
                            textValue={this.state.question.englishText}
                            labelText="Q-En"
                        />
                        <TextAreaAutosize
                            myId="questionRu"
                            textValue={this.state.question.russianText}
                            labelText="Q-Ru"
                        />
                    </div>
                    <hr />
                    {this.state.question.answers.map((answer, i) => (
                        <div className="row row-back" key={`answ${i}`}>
                            <TextAreaAutosize
                                myId={`answerEn${answer.id}`}
                                textValue={answer.englishText}
                                labelText={`A${i + 1}-En`}
                            />
                            <TextAreaAutosize
                                myId={`answerRu${answer.id}`}
                                textValue={answer.russianText == null ? "" : answer.russianText}
                                labelText={`A${i + 1}-Ru`}
                            />
                        </div>
                    ))}
                    <div style={{ paddingLeft: "35%" }}>
                        <button className="button button--ujarak button--border-medium button--round-s button--text-thick" onClick={() => this.handleClick()}>Сохранить</button>
                    </div>
                </div>
            </div>
        );
    }
}

class TextAreaAutosize extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textValue: this.props.textValue
        }
    }
    componentDidMount() {
        this.textarea.focus();
        autosize(this.textarea);
    }

    render() {
        const style = {
            resize: "none",
            fontSize: "15px"
        };
        return (
            <span>
                <textarea
                    className="gate"
                    id={this.props.myId}
                    style={style}
                    ref={c => (this.textarea = c)}
                    rows={1}
                    defaultValue={this.state.textValue}
                />
                <label htmlFor={this.props.myId}>{this.props.labelText}</label>
            </span>
        );
    }
}
