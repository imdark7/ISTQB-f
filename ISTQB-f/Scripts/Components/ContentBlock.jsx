class ContentBlock extends React.Component {
    constructor(props) {
        super(props);
        this.selectAnswerHandler = this.selectAnswerHandler.bind(this);
        this.state = {
            language: this.props.language
        }
    }
    selectAnswerHandler(answerId) {
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ language: nextProps.language });
    }
    render() {
        return (
            <div style={{ marginLeft: "10px" }}>
                <QuestionBlock
                    key={this.props.question.id}
                    selectAnswerHandler={this.selectAnswerHandler}
                    questionHandler={this.props.questionHandler}
                    language={this.state.language}
                    question={this.props.question}
                    isExam={false}
                />
            </div>
        );

    }
}