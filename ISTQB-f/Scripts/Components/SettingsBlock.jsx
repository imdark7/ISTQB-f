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
                        <input style={{width: "110px", marginRight: "10px"}} id="questionNumberInput" placeholder="Номер вопроса" />
                        <button className="btn btn-default" onClick={() => this.props.gotoHandler()}>Go!</button>
                    </li>
                </ul>
            </div>
        );

    }
}