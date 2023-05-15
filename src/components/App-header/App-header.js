import React from 'react';

import AppHeaderInput from '../App-header-input/App-header-input';

function AppHeader({ addItem }) {
  return (
    <header className="header">
      <h1>todos</h1>
      <AppHeaderInput addItem={addItem} />
    </header>
  );
}

export default AppHeader;
