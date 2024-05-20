// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage,setStateFunc) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
 }

 handleProductsList = () => {
  const message = this.createChatBotMessage(
    "We have the following resources for products:",
    {
      widget : "ProductLinks",
    }
    );
    this.updateChatbotState(message);
 }

  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      "Fantastic, I've got the following resources for you on Javascript:",
      {
        widget: "javascriptLinks",
      }
    );

    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    // NOTICE: This function is set in the constructor, and is passed in from the top level Chatbot component. The setState function here actually manipulates the top level state of the Chatbot, so it's important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }


 greet() {
  const greetingMessage = this.createChatBotMessage("Hi, friend.");
  this.updateChatbotState(greetingMessage);
 }

 goodbyeMessage(){
  const goodbyeMessage = this.createChatBotMessage("Goodbye! Have a nice day!");
  this.updateChatbotState(goodbyeMessage);
 }

 whereProducts() {
  const whereProductsMessage = this.createChatBotMessage("You can find information about products on our products page.");
  this.updateChatbotState(whereProductsMessage);
 }


}

export default ActionProvider;