import React, { Component } from 'react';
import { sortBy, last } from 'lodash';

export default class ScheduleTable extends Component {
  state = {
    talks: this.props.talks.map((talk, i) => ({
      ...talk,
      length: 30,
      qa: 10,
      break: 0,
    })),
  };

  updateTalk = newTalk => {
    console.log(newTalk);
    this.setState({
      talks: sortBy(
        this.state.talks.map(talk => (talk.id === newTalk.id ? newTalk : talk)),
        'position',
      ),
    });
  };

  move(x, y) {
    return () => {
      this.setState({
        talks: swap(this.state.talks, x, y),
      });
    };
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th />
            <th>Length</th>
            <th>QA</th>
            <th>Break</th>
            <th>Start at</th>
            <th>End at</th>
          </tr>
        </thead>
        <tbody>
          {this.state.talks.map((talk, i) =>
            <tr key={talk.id}>
              <td>
                {talk.id}
              </td>
              <td>
                {talk.name}
              </td>
              <td>
                <button onClick={this.move(i - 1, i)}>⬆</button>
                <button onClick={this.move(i, i + 1)}>⬇</button>
              </td>
              <td>
                <NumberInput
                  talk={talk}
                  updateTalk={this.updateTalk}
                  name="length"
                />
              </td>
              <td>
                <NumberInput
                  talk={talk}
                  updateTalk={this.updateTalk}
                  name="qa"
                />
              </td>
              <td>
                <NumberInput
                  talk={talk}
                  updateTalk={this.updateTalk}
                  name="break"
                />
              </td>
              <td>
                {calculateStartAt(talk)}
              </td>
              <td>
                {calculateFinishAt(talk)}
              </td>
            </tr>,
          )}
        </tbody>
      </table>
    );
  }
}

function calculateStartAt(talk) {
  return talk.length + talk.qa;
}

function calculateFinishAt(talk) {
  return talk.length + talk.qa;
}

function swap(a, x, y) {
  [x, y] = [x, y].sort();
  return (
    (a[x] &&
    a[y] && [
      ...a.slice(0, x),
      a[y],
      ...a.slice(x + 1, y),
      a[x],
      ...a.slice(y + 1),
    ]) ||
    a
  );
}

class NumberInput extends Component {
  onChange = e => {
    const value = e.target.value;

    this.props.updateTalk({
      ...this.props.talk,
      [this.props.name]: parseInt(value, 10),
    });
  };

  render() {
    return (
      <input
        type="number"
        onChange={this.onChange}
        value={this.props.talk[this.props.name]}
      />
    );
  }
}
