class SettingsBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            strategy: props.strategy
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ strategy: nextProps.strategy });
    }
    componentDidMount() {
        $(document).keypress(function (e) {
            if (e.which == 13 && document.getElementById("questionNumberInput") === document.activeElement) {
                document.getElementById("go-go-power-rangers").click();
            }
        });
    }
    render() {
        return (
            <div>
                <ul className="settings-bar green-back">
                    <li className="settings-label">
                        <label className="settings-label-text">Настройки</label>
                    </li>
                    <li>
                        <SettingsLink
                            type="lang"
                            btnText="Переключить язык"
                            langHandler={this.props.langHandler}
                        />
                    </li>
                    <li>
                        <SettingsLink
                            type="rand"
                            btnText={this.state.strategy === "random" ? "Случайные вопросы" : "Вопросы по порядку"}
                            randHandler={this.props.randHandler}
                        />
                    </li>
                    <li style={{padding: "9px"}} className="settings-label">
                        <input style={{width: "113px", marginRight: "10px"}} id="questionNumberInput" placeholder="Номер вопроса" />
                        <button id="go-go-power-rangers" className="go-button btn btn-default" onClick={() => this.props.gotoHandler()}>Go!</button>
                    </li>
                </ul>
            </div>
        );

    }
}