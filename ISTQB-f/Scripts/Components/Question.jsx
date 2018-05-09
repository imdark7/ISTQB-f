class QuestionBlock extends React.Component {
    render() {
        var isRus = this.props.language === "ru";
        var questText = isRus ? this.props.question.russianText : this.props.question.englishText;
        var splitted = questText.split("\r");
        var quest = this.props.question;
        function checkAnswer() {
            var rightId = quest.answers.find((a) => (a.isCorrect)).id;
            var id = $('input[name=AnswerRadio]:checked').attr("id");
            $(`div[id = "answ-${rightId}"]`).css("backgroundColor", "limegreen");
            if (id != rightId) {
                $(`div[id = "answ-${id}"]`).css("backgroundColor", "orangered");
            }
            $('input[id=checkAnswButton]').css("display", "none");
            $('input[id=nextQuestButton]').css("display", "inline");
        };
        var displayCh = this.props.isExam ? "none" : "inline";
        var displayNext = this.props.isExam ? "inline" : "none";
        return (
            <div>
                <p style={{ paddingTop: "10px", fontWeight: "bold" }}>Вопрос № {quest.id}</p>
                {splitted.map((sen, i) =>
                    <h4 key={i + "-" + this.props.question.id}>{sen}</h4>
                )}
                {this.props.question.resource != null ?
                    <a className="fancybox" rel="group" href={`/Content/Resources/${this.props.question.resource}.jpg`}>
                        <img width="200px" src={`/Content/Resources/${this.props.question.resource}.jpg`} alt="" />
                    </a> : ""}
                <hr />
                {this.props.question.answers.map((answer) =>
                    <AnswerBlock
                        key={answer.id}
                        answerText={isRus && answer.russianText != undefined ? answer.russianText : answer.englishText}
                        id={answer.id}
                        selectAnswerHandler={this.props.selectAnswerHandler}
                        checked={this.props.checkedId === answer.id}
                        examIsOver={this.props.examIsOver}
                        bgColor={this.props.examIsOver ? (answer.isCorrect ? "#61fd7b" : (this.props.checkedId === answer.id ? "#fd6161" : null )) : null}
                    />
                )}
                <div style={{ marginTop: "10px" }}>
                    <input
                        type="button"
                        id="checkAnswButton"
                        className="standart-size btn btn-default"
                        onClick={() => checkAnswer()}
                        value="Проверить ответ"
                        style={{ display: displayCh }}
                    />
                    <input
                        type="button"
                        id="nextQuestButton"
                        className="standart-size btn btn-default"
                        onClick={() => this.props.questionHandler()}
                        value="Дальше >>"
                        style={{ display: displayNext }}
                    />
                </div>
            </div>
        );
    }
}