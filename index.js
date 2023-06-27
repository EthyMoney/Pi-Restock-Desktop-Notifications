const Parser = require('rss-parser');
const notifier = require('node-notifier');
const cron = require('node-cron');
const path = require('path');

let parser = new Parser();
let latestTitle;

const notify = (title, content) => {
  notifier.notify({
    title: title,
    message: content,
    sound: false,
    wait: true,
    appID: 'Pi Stock Notifier', // the tiny subtitle on the notifications (snoretoast puts it there by default, this overrides it)
    icon: path.join(__dirname, 'assets/raspberrry_pi_logo.png'),
  });
};

notify('Pi Stock Notifier', 'Pi Stock Notifier is running, will notify you when Raspberry Pi\'s are in stock!')

async function checkFeed(initialCheck = false) {
  let feed;
  try { // catch any http errors with the request
    feed = await parser.parseURL('https://rpilocator.com/feed/');
  } catch (e) {
    console.log('Error fetching feed, will try again on next interval');
    return;
  }

  if (latestTitle !== feed.items[0].title) {
    latestTitle = feed.items[0].title;
    if (latestTitle.includes('Stock Alert (US)') && !initialCheck) {
      const trimmedTitle = latestTitle.substring(17);
      notify('Raspberry Pi\'s IN STOCK!', trimmedTitle);
      console.log('Raspberry Pi\'s IN STOCK! Check your notifications!')
    }
  }
};

// Run the task every minute
cron.schedule('* * * * *', () => {
  checkFeed();
});

// initial check on startup (set initialCheck to true to avoid notification on startup)
checkFeed(true);

console.log('\nPi Stock Notifier is running, will notify you when Raspberry Pi\'s are in stock!')
