import React, { Component } from 'react';

export default class ScheduleTable extends Component {
  state = {
    talks: this.props.talks.map(talk => ({
      ...talk,
      startAt: '00:00',
      length: '30',
      qa: '10',
    })),
  };

  updateTalk = newTalk => {
    console.log(newTalk);
    this.setState({
      talks: this.state.talks.map(
        talk => (talk.id === newTalk.id ? newTalk : talk),
      ),
    });
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Length</th>
            <th>QA</th>
            <th>Start at</th>
            <th>End at</th>
          </tr>
        </thead>
        <tbody>
          {this.state.talks.map(talk =>
            <tr key={talk.id}>
              <td>
                {talk.id}
              </td>
              <td>
                {talk.name}
              </td>
              <td>
                <TextInput
                  talk={talk}
                  updateTalk={this.updateTalk}
                  name="length"
                />
              </td>
              <td>
                <TextInput talk={talk} updateTalk={this.updateTalk} name="qa" />
              </td>
              <td>
                <TextInput
                  talk={talk}
                  updateTalk={this.updateTalk}
                  name="startAt"
                />
              </td>
              <td>00:00</td>
            </tr>,
          )}
        </tbody>
      </table>
    );
  }
}

class TextInput extends Component {
  onChange = e => {
    const value = e.target.value;

    this.props.updateTalk({ ...this.props.talk, [this.props.name]: value });
  };

  render() {
    return (
      <input
        type="text"
        onChange={this.onChange}
        value={this.props.talk[this.props.name]}
      />
    );
  }
}
