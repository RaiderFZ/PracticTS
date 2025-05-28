import React, { useState } from 'react'

import Counter from './Counter';
import './App.css'

const App: React.FC = () => {
  return (
    <div>
      <h1>Counter</h1>
      <Counter initialCount={5}/>
    </div>
  )
}

export default App;
