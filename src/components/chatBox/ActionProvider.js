// ActionProvider starter code
class ActionProvider {
  constructor(createChatBotMessage,setStateFunc) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
 }

 handleProductsList = () => {
  const message = this.createChatBotMessage(
    "U kunt informatie vinden over onze producten op de begin pagina.",
    {
      widget : "ProductLinks",
    }
    );
    this.updateChatbotState(message);
 }

 handleOrderList = () => {
  const message = this.createChatBotMessage(
    `U kan informatie vinden over de bestelling in de bestellingen tab. U kan deze infomatie vinden in de notificaties tab als u op een notificatie klikt.`,
    {
      widget : "OrderLinks",
    }
    );
    this.updateChatbotState(message);
 }

 handleRemindersList = () => {
  const message = this.createChatBotMessage(
    "Het is mogelijk om een betalingsherinnering te sturen naar de klant. Navigeer naar de notificaties tab. Kies een bestelling door de order id aan te kliken en durk dan op verzenden.",
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
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }

 greet() {
  const greetingMessage = this.createChatBotMessage(`Hallo, kan ik je ergens mee helpen?`);
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
}

export default ActionProvider;