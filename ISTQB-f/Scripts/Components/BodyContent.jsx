class BodyContent extends React.Component {
    constructor(props) {
        super(props);
        this.langHandler = this.langHandler.bind(this);
        this.randHandler = this.randHandler.bind(this);
        this.questionHandler = this.questionHandler.bind(this);
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
            </div>
        );
    }
};
