<img src="https://i.imgur.com/wK9Qwpd.png" alt="rpi-locator-logo" width="140" height="140"><img src="https://i.imgur.com/wGS3rmH.png" alt="raspberry-pi-logo" width="150" height="150">

# Pi-Restock-Desktop-Notifications
 Trying to buy a Pi and use a computer most of your day? Use this to get restock notifications right in your computer's OS when [rpilocator.com](https://rpilocator.com/) sees a Raspberry Pi restock.

## Why?

I have a lot of projects I want to work on and Raspberry Pis are hard to get ahold of and have been for a while, which is why rpilocator.com came to be. Rpilocator very generously provides a nice RSS feed that provides all stock notifications that the site gets in real time. I wanted the ability to be working throughout the day and have these notifications pop up right on my computer so I can quickly buy when I see it, so I made this app to do just that. It monitors the RSS feed and shows me a native OS notification right on my computer when a new stock message comes up.

## Prerequisites

Before running the application, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) LTS edition (v18 or higher)

## Setup

1. Clone this repository to your local machine:

    `git clone https://github.com/EthyMoney/Pi-Restock-Desktop-Notifications.git`

2. Navigate to the project directory:

    `cd Pi-Restock-Desktop-Notifications`

3. Install the project dependencies:

    `npm install`
    
4. (Optional) Customize the checking options:

    The checkFeed() method checks the title contents for the in-stock text and the county code (it's set to United States by default). If you are in a different country, you will want to change that to your own country's code. Check the current feed [here](https://rpilocator.com/feed/) to see previous messages and how their country codes look if you need a reference. This area is where you can also customize the checkup code if you are looking for a specific model of Pi or maybe from a specific vendor. By default it's watching for all models from all vendors in the USA.

## Running the Application

To run the application, simply use the following command:
`npm start`

You should then see startup notification appear telling you the app is running, this is how you know everything is working and good to go. If you see the notification, you're all set! Now just wait patiently for your 

## Open Source

#### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

#### Contributing
Contributions are welcome and encouraged! Please feel free to open issues for problems you encounter or feature requests and ideas you come up with. If you would like to contribute code, please open a pull request and describe your changes and reasoning for them. This is a fairly simple app, but there's improvements that can be made and new features that can be added. Thank you in advance for your help!
