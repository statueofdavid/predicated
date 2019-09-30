const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET
});

(async () => {
	await app.start(process.env.PORT || 3000);
})();

app.event('app_home_opened', ({ event, say }) => {
	say(`Hello world, <@${event.user}>!`);
});

