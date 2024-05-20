// Config starter code
import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import DelawareBotOptions from './chatBoxComponents/BotOptions/DelawareBotOptions';
import LinkList from './chatBoxComponents/LinkList/LinkList';

const config = {
  botName: 'DelawareHelperBot',
  initialMessages: [
    createChatBotMessage("Hi, I'm here to help. What are you looking for?", {
      widget: 'delawareBotOptions',
    }),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#376B7E',
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
          {
            text: 'Introduction to Products',
            url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/',
            id: 1,
          },
          {
            text: 'Delaware Products Guide',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
            id: 2,
          },
          {
            text: 'Frontend Products',
            url: 'https://frontendmasters.com',
            id: 3,
          },
        ],
      },
    },
  ],
};

export default config;
