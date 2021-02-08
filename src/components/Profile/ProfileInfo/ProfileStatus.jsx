import React from 'react';

class profileStatus extends React.Component {
  state = {
    editMode: false,
    status: this.props.status,
  };
  toggleEditMode = () => {
    debugger;
    if (this.state.editMode) this.props.updateStatus(this.state.status);
    this.setState({
      editMode: !this.state.editMode,
    });
  };
  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });
    this.props.updateStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.target.value,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <input
            onChange={this.onStatusChange}
            autoFocus={true}
            onBlur={this.deactivateEditMode}
            value={this.state.status}
          ></input>
        ) : (
          <span onDoubleClick={this.activateEditMode}>
            {this.props.status || 'No status'}
          </span>
        )}
      </div>
    );
  }
}

export default profileStatus;
