const { App } = require('@slack/bolt');
const store = require('./store');

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

app.event('app_home_opened', async ({ event, say }) => {
  // Look up the user from DB
  let user = store.getUser(event.user);

  if (!user) {
    user = {
      user: event.user,
      channel: event.channel
    };
    store.addUser(user);

    await say(`Hello world, and welcome <@${event.user}>!`);
    console.log(event);
  } else {
    await say('Hi again!');
    console.log(event);
  }
});

// Listens for messages containing "knock knock" and responds with an italicized "who's there?"
app.message('knock knock', async ({ event, say }) => {
  await say(`_Who's there?_`);
  app.message('boo', async ({event, say}) => {
    await say(`_boo who?_`);
      app.message('do not cry', async ({event, say}) => {
      await say(`_:)_`);
      });
  });
});

app.event('app_mention', async ({ event, say, payload }) => {
  console.log(payload);
  await say(`_what it do, <@${event.user}>_`);

});

//FUTURE TODO: figure how to integrate this damn bot with Github

// Start your app
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();
