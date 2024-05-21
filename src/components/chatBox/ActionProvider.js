// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage,setStateFunc) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
 }

 handleProductsList = () => {
  const message = this.createChatBotMessage(
    "We hebben volgende resources voor products:",
    {
      widget : "ProductLinks",
    }
    );
    this.updateChatbotState(message);
 }

 handleOrderList = () => {
  const message = this.createChatBotMessage(
    "We hebben volgende resources voor orders:",
    {
      widget : "OrderLinks",
    }
    );
    this.updateChatbotState(message);
 }

 handleRemindersList = () => {
  const message = this.createChatBotMessage(
    "We hebben volgende resources voor reminders:",
    {
      widget : "ReminderLinks",
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
  const greetingMessage = this.createChatBotMessage(`Hallo`);
  this.updateChatbotState(greetingMessage);
 }

 goodbyeMessage(){
  const goodbyeMessage = this.createChatBotMessage("Tot ziens! Nog een prettige dag verder!");
  this.updateChatbotState(goodbyeMessage);
 }


 helpMessage(){
  const helpMessage = this.createChatBotMessage("Waar kan ik je mee helpen?");
  this.updateChatbotState(helpMessage);
 }

 //vervangen door handleProductsList()
//  whereProducts() {
//   const whereProductsMessage = this.createChatBotMessage("U kan informatie vinden over onze producten op de home page.");
//   this.updateChatbotState(whereProductsMessage);
//  }


}

export default ActionProvider;