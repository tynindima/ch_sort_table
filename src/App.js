import React from 'react';
import './App.css';

import Table from './components/Table';
import data from './API/users.json';

function App() {
  return (
    <>
      <h1>My table sort</h1>
      <Table data={data} />
    </>
  );
}

export default App;
