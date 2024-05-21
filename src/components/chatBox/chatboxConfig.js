// Config starter code
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import DelawareBotOptions from './chatBoxComponents/BotOptions/DelawareBotOptions';
import LinkList from './chatBoxComponents/LinkList/LinkList';


const enmsg = ["Hi, I'm here to help. What are you looking for?"];
const nlmsg = ["Goeiedag, kan ik u ergens mee helpen?"];
const oldBGC_hex = ['#376B7E'];

const config = {
  botName: 'DelawareHelperBot',
  initialMessages: [
    createChatBotMessage(nlmsg, {
      widget: 'delawareBotOptions',
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#EF4444',
    },
    chatButton: {
      backgroundColor: '#EF4444',
    },
  },
  widgets: [
    {
      widgetName: 'delawareBotOptions',
      widgetFunc: (props) => <DelawareBotOptions {...props} />,
      options: [
        {
          text: 'Introduction to JS',
          url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/',
          id: 1,
        },
        {
          text: 'Mozilla JS Guide',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          id: 2,
        },
        {
          text: 'Frontend Masters',
          url: 'https://frontendmasters.com',
          id: 3,
        },
      ],
    },
    {
      widgetName: 'javascriptLinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: 'Introduction to JS',
            url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/',
            id: 1,
          },
          {
            text: 'Mozilla JS Guide',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
            id: 2,
          },
          {
            text: 'Frontend Masters',
            url: 'https://frontendmasters.com',
            id: 3,
          },
        ],
      },
    },
    {
      widgetName: 'ProductLinks',
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          // {
          //   text: 'U kan informatie vinden over onze producten op de home page.',
          //   url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/',
          //   id: 1,
          // },
          // {
          //   text: 'Delaware Products Guide',
          //   url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          //   id: 2,
          // },
          // {
          //   text: 'Frontend Products',
          //   url: 'https://frontendmasters.com',
          //   id: 3,
          // },
        ],
      },
    },
    {
      widgetName: "OrderLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          // {
          //   text: "U kan informatie vinden over de orders in de bestellingen tab.",
          //   url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
          //   id: 1,
          // },
          // {
          //   text: "U kan ook info vinden in de notificaties tab.",
          //   url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          //   id: 2,
          // },
          // {
          //   text: "Click op een order voor meer details",
          //   url: "https://frontendmasters.com",
          //   id: 3,
          // },
        ],
      },
    },
    {
      widgetName: "ReminderLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          // {
          //   text: "Het is mogelijk om een betalingsherinnering te sturen naar de klant.",
          //   url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
          //   id: 1,
          // },
          // {
          //   text: "Navigeer naar de notificaties tab.",
          //   url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
          //   id: 2,
          // },
          // {
          //   text: "Kies een order en click op verzenden.",
          //   url: "https://frontendmasters.com",
          //   id: 3,
          // },
        ],
      },
    },
  ],
};

export default config;
