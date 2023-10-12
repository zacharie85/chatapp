// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppNavigation from './src/navigation/index';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
