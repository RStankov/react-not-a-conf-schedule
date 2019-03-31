import React, { Component } from 'react';
import { sortBy, padStart } from 'lodash';

const TIMINGS = {
  'Coffee break': { length: 0, qa: 0, break: 20 },
  'Lunch break': { length: 0, qa: 0, break: 60 },
  Opening: { length: 15, qa: 0, break: 0 },
  Closing: { length: 10, qa: 0, break: 0 },
  Talk: { length: 30, qa: 10, break: 0 },
};

export default class ScheduleTable extends Component {
  state = {
    talks: this.props.talks.map((talk, i) => ({
      id: i + 1,
      name: talk,
      ...(TIMINGS[talk] || TIMINGS.Talk),
    })),
  };

  updateTalk = newTalk => {
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

  startAt(i) {
    if (i < 1) {
      return this.props.startAt;
    }

    return addTime(this.endAt(i - 1), this.state.talks[i - 1].break);
  }

  endAt(i) {
    const talk = this.state.talks[i];
    return addTime(this.startAt(i), talk.length + talk.qa);
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
          {this.state.talks.map((talk, i) => (
            <tr key={talk.id}>
              <td>{talk.id}</td>
              <td className="name">{talk.name}</td>
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
              <td>{this.startAt(i)}</td>
              <td>{this.endAt(i)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function addTime(time, length) {
  let [hour, minutes] = time.split(':').map(n => parseInt(n, 10));

  minutes += length;

  if (minutes >= 60) {
    hour += Math.floor((1.0 * minutes) / 60);
    minutes = parseInt((1.0 * minutes) % 60, 10);
  }

  return `${padStart(hour, 2, '0')}:${padStart(minutes, 2, '0')}`;
}

function swap(a, x, y) {
  if (!a[x] || !a[y]) return a;

  const d = [...a];

  d[x] = a[y];
  d[y] = a[x];

  return d;
}

class NumberInput extends Component {
  onChange = e => {
    const value = e.target.value;

    this.props.updateTalk({
      ...this.props.talk,
      [this.props.name]: Math.max(0, parseInt(value, 10)),
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
