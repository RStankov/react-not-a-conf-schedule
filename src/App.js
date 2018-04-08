import React from 'react';
import ScheduleTable from './ScheduleTable';

const TALKS = [
  {
    id: 3,
    name: 'Opening',
  },
  {
    id: 5,
    name: 'Integrating React Into Legacy Projects',
  },
  {
    id: 2,
    name: 'Reactive Blockchain',
  },
  {
    id: 10,
    name: 'Humanizing Your Documentation',
  },
  {
    id: 11,
    name: 'Sagas and Selectors',
  },
  {
    id: 12,
    name: 'Lunch Break',
  },
  {
    id: 4,
    name: 'NADCast',
  },
  {
    id: 8,
    name: 'Garbage Collection in Modern Web Applications',
  },
  {
    id: 7,
    name: 'Designing with React',
  },
  {
    id: 13,
    name: 'Coffee Break',
  },
  {
    id: 6,
    name: 'Rebuilding Product Hunt Mobile with React.Native',
  },
  {
    id: 1,
    name: '🤔😅⁇',
  },
  {
    id: 14,
    name: 'Closing',
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
