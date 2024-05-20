// MessageParser starter code
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  //gebruiker typen -> keyword feedback handling
  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")){
      this.actionProvider.greet();
    }

    if(lowerCaseMessage.includes("product")){
      //this.actionProvider.whereProducts();
      this.actionProvider.handleProductsList();
    }

    if(lowerCaseMessage.includes("goodbye")){
      this.actionProvider.goodbyeMessage();
    }

    if (lowerCaseMessage.includes("javascript")) {
      this.actionProvider.handleJavascriptList();
    }
  }
}

export default MessageParser;