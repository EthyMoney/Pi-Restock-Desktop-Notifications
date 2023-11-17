const Parser = require('rss-parser');
const notifier = require('node-notifier');
const cron = require('node-cron');
const path = require('path');

let parser = new Parser();
let latestItems = [];
let consecutiveErrors = 0;

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
    feed = await parser.parseURL('https://rpilocator.com/feed/?country=US'); // You can customize this feed link for your specific needs (your country, model, vendor, etc. See the very bottom of https://rpilocator.com/about.cfm for more info)
  } catch (e) {
    consecutiveErrors++;
    // log time with error message
    if (consecutiveErrors > 5) console.log(`[${getCurrentTimeString()}] Haven't been unable to fetch feed for 5 minutes, will keep trying every minute but something might be wrong with the feed or connection..`);
    return;
  }

  // Reset consecutive errors if feed is fetched successfully
  if (feed.items.length > 0) {
    consecutiveErrors = 0;
  }

  // Get new items since last check
  let newItems = feed.items.filter(item => !latestItems.find(i => i.title === item.title));

  // Update the latestItems array
  latestItems = feed.items.map(item => ({ title: item.title, link: item.link }));

  // Iterate over new items and notify if they match the condition
  newItems.forEach(item => {
    if (item.title.includes('Stock Alert') && !initialCheck) {
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
function getCurrentTimeString() {
  return new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
}

console.log(`\n[${getCurrentTimeString()}] Pi Stock Notifier is running, will notify you when Raspberry Pi\'s are in stock!`)
