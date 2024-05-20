// MessageParser starter code
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  //gebruiker typen -> keyword feedback handling
  parse(message) {
    const lowerCaseMessage = message.toLowerCase();


    const greetingKeywords = ["hello", "hallo", "hi", "hoi","ahoy","dag","goeiedag"];
    if (greetingKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      this.actionProvider.greet();
    }

    if (lowerCaseMessage.includes("help")){
      this.actionProvider.helpMessage();
    }

    if(lowerCaseMessage.includes("product")){
      //this.actionProvider.whereProducts();
      this.actionProvider.handleProductsList();
    }

    const reminderKeywords = ["herinner","herinnering","herinneringen","reminder","reminders","betaalherinnering","betaalherinneringen","betalingsherinnering","betalingsherinneringen"];
    if (reminderKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      this.actionProvider.handleRemindersList();
    }

    const orderKeywords = ["order","orders","bestelling","bestellingen"];
    if (orderKeywords.some(keyword => lowerCaseMessage.includes(keyword))) {
      this.actionProvider.handleOrderList();
    }

    if (lowerCaseMessage.includes("javascript")) {
      this.actionProvider.handleJavascriptList();
    }

    const exitKeywords = ["bye", "goodbye", "salut", "salu","vaarwel","daag","tot ziens","tot later"];
    if(exitKeywords.some(keyword => lowerCaseMessage.includes(keyword))){
      this.actionProvider.goodbyeMessage();
    }
  }
}

export default MessageParser;