import React from 'react';
import ScheduleTable from './ScheduleTable';
import data from './data/2019';

export default function App() {
  return (
    <main>
      <ScheduleTable talks={data.talks} startAt={data.startAt} />
    </main>
  );
}
