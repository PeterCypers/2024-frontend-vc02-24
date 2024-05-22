//custom css vanuit chatbox nodemodules
import 'react-chatbot-kit/build/main.css';
import './layout.css';
import Chatbot from 'react-chatbot-kit';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './chatboxConfig';

//default, moet je niet meegeven (ter info)
const nl_placeholder = "Schrijf hier je vragen";

function Chatbox() {
  return (
    <div className="App">
      <header className="App-header">
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} placeholderText={nl_placeholder} headerText={"Conversatie met DelawareHelperBot"} />
      </header>
    </div>
  );
}

export default Chatbox;
