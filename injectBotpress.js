// injectBotpress.js
(function () {
  const script = document.createElement('script');
  script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
  script.async = true;
  script.onload = () => {
    window.botpressWebChat.init({
      "composerPlaceholder": "Chat with us",
      "botId": "041402da-552b-41d5-b5d6-396353b53653",
      "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
      "messagingUrl": "https://messaging.botpress.cloud",
      "clientId": "041402da-552b-41d5-b5d6-396353b53653",
      "lazySocket": true,
      "themeName": "prism",
      "stylesheet": "https://webchat-styler-css.botpress.app/prod/code/fc0b6e3a-44fd-4df7-8489-7a7cd6f42c0e/v79899/style.css",
      "enableConversationDeletion": true,
      "showCloseButton": true,
      "theme": "prism",
    });
  };
  document.body.appendChild(script);
})();
