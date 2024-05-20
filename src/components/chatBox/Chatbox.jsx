//custom css vanuit chatbox nodemodules
import 'react-chatbot-kit/build/main.css';
import Chatbot from 'react-chatbot-kit';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './chatboxConfig';

function Chatbox() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}  />
      </header>
    </div>
  );
}

export default Chatbox;
