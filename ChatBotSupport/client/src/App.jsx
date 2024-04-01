import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <ChatWindow />
        <ChatInput />
      </div>
    </Provider>
  );
};

export default App;