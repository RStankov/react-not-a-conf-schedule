import React, { Component } from 'react';

export default class ScheduleTable extends Component {
  state = {
    talks: this.props.talks.map(talk => ({
      ...talk,
      startAt: '00:00',
      length: '30',
      qa: '10',
      break: '0',
    })),
  };

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>start at</th>
            <th>end at</th>
            <th>length</th>
            <th>qa</th>
            <th>break</th>
          </tr>
        </thead>
        <tbody>
          {this.state.talks.map(talk =>
            <tr key={talk.id}>
              <td>
                {talk.id}
              </td>
              <td>name</td>
              <td>length</td>
              <td>qa</td>
              <td>break</td>
              <td>start at</td>
              <td>end at</td>
            </tr>,
          )}
        </tbody>
      </table>
    );
  }
}
