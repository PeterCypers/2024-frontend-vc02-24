//custom css vanuit chatbox nodemodules
import 'react-chatbot-kit/build/main.css';
import Chatbot from 'react-chatbot-kit';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './chatboxConfig';

//default, moet je niet meegeven (ter info)
const nl_placeholder = "Schrijf hier je vragen";
const nl_headerText = "Conversatie met DelawareHelperBot"; //botname from config.botname

function Chatbox() {
  return (
    <div className="App" id='chatBot'>
      <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} placeholderText={nl_placeholder} headerText={nl_headerText} />
      </header>
    </div>
  );
}

export default Chatbox;
