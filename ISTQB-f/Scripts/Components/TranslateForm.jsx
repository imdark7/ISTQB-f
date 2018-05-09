class TranslateForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        var trData = JSON.parse(this.props.question);
        trData.englishText = document.getElementById("questionEn").value;
        trData.russianText = document.getElementById("questionRu").value;
        for (var i = 0; i < trData.answers.length; i++) {
            let id = trData.answers[i].id;
            trData.answers[i].englishText = document.getElementById("answerEn" + id).value;
            trData.answers[i].russianText = document.getElementById("answerRu" + id).value;
        }
        fetch("/Training/SetTranlation",
        {
            method: "POST",
            dataType: "JSON",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Accept": "application/json"
            },
            body: JSON.stringify(trData)
            });
        alert("Готово!");
    }
    render() {
        var quest = JSON.parse(this.props.question);
        return (
            <div>
                <div id="translateForm">
                    <div>Вопрос № {quest.id}</div>
                    <div className="row row-question">
                        <TextAreaAutosize
                            myId="questionEn"
                            textValue={quest.englishText}
                            labelText="Q-En"
                        />
                        <TextAreaAutosize
                            myId="questionRu"
                            textValue={quest.russianText}
                            labelText="Q-Ru"
                        />
                    </div>
                    <hr />
                    {quest.answers.map((answer, i) => (
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