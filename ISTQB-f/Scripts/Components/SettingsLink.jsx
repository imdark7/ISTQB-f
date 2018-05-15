class SettingsLink extends React.Component {
    render() {
        var handler = this.props.type === "lang" ? () => this.props.langHandler() : () => this.props.randHandler();
        var name = this.props.type === "lang"
            ? "translation"
            : (this.props.btnText === "Случайные вопросы" ? "shuffle" : "timeline");
        return (
            <div>
                <a onClick={handler}>{this.props.btnText}</a>
                <img id="order-set" src={`/Content/${name}.png`} height="45" width="45" style={{ display: "none" }} onClick={handler} />
            </div>
        );
    }
}