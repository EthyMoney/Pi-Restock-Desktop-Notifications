const Parser = require('rss-parser');
const notifier = require('node-notifier');
const cron = require('node-cron');
const path = require('path');

let parser = new Parser();
let latestItems = [];

const notify = (title, content, link) => {
  notifier.notify({
    title: title,
    message: content,
    open: link,
    sound: false,
    wait: true,
    appID: 'Pi Stock Notifier',
    icon: path.join(__dirname, 'assets/raspberrry_pi_logo.png'),
  });
};

notify('Pi Stock Notifier', 'Pi Stock Notifier is running, will notify you when Raspberry Pi\'s are in stock!')

async function checkFeed(initialCheck = false) {
  let feed;
  try {
    feed = await parser.parseURL('https://rpilocator.com/feed/');
  } catch (e) {
    // log time with error message
    console.log(`[${getCurrentTimeString()}] Error fetching feed, will try again on next interval`);
    return;
  }

  // Get new items since last check
  let newItems = feed.items.filter(item => !latestItems.find(i => i.title === item.title));

  // Update the latestItems array
  latestItems = feed.items.map(item => ({ title: item.title, link: item.link }));

  // Iterate over new items and notify if they match the condition
  newItems.forEach(item => {
    if (item.title.includes('Stock Alert (US)') && !initialCheck) {
      const trimmedTitle = item.title.substring(17).trim();
      notify('Raspberry Pi\'s IN STOCK!', trimmedTitle, item.link);
      console.log(`[${getCurrentTimeString()}] Raspberry Pi\'s IN STOCK! ${trimmedTitle}`)
    }
  });
};

// Run the task every minute
cron.schedule('* * * * *', () => {
  checkFeed();
});

// initial check on startup (set initialCheck to true to avoid notification on startup)
checkFeed(true);

// Helper function get a timestamp for the console messages ending with timezone
function getCurrentTimeString(){
  return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
}

console.log(`\n[${getCurrentTimeString()}] Pi Stock Notifier is running, will notify you when Raspberry Pi\'s are in stock!`)
