class SettingsLink extends React.Component {
    render() {
        return (
            <div>
                <a href="javascript:void(0);" onClick={() => this.props.type === "lang" ? this.props.langHandler() : this.props.randHandler()}>{this.props.btnText}</a>
            </div>
        );
    }
}