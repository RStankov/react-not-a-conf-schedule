import React from 'react';
import ScheduleTable from './ScheduleTable';

const TALKS = [
  {
    id: 1,
    name: '🤔😅⁇',
  },
  {
    id: 2,
    name: 'Reactive Blockchain',
  },
  {
    id: 3,
    name: 'Opening',
  },
  {
    id: 4,
    name: 'NADCast',
  },
  {
    id: 5,
    name: 'Integrating React Into Legacy Projects',
  },
  {
    id: 6,
    name: 'Rebuilding Product Hunt Mobile with React.Native',
  },
  {
    id: 7,
    name: 'Designing with React',
  },
  {
    id: 8,
    name: 'Garbage Collection in Modern Web Applications',
  },
  {
    id: 10,
    name: 'Humanizing Your Documentation',
  },
  {
    id: 11,
    name: 'Rebecca Hill',
  },
  {
    id: 12,
    name: 'Lunch Break',
  },
  {
    id: 13,
    name: 'Coffee Break',
  },
];
const START_AT = '09:45';
export default function App() {
  return (
    <main>
      <ScheduleTable talks={TALKS} startAt={START_AT} />
    </main>
  );
}
