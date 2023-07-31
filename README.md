<img src="assets/rpilocator-logo.png" alt="rpi-locator-logo" width="140" height="140"><img src="assets/raspberrry_pi_logo.png" alt="raspberry-pi-logo" width="150" height="150">

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

    The checkFeed() method pulls from the RSS feed link which you can customize to only provide data that you want to see. By default it grabs all models, from any vendor, in just the USA. You can customize this feed link for your specific needs. You can select your desired country, model, vendor, etc. See the very bottom of rpilocator's [About Page](https://rpilocator.com/about.cfm) for more info on how to do this, it shows how the URL should look with your selections.

## Running the Application

To run the application, simply use the following command:
`npm start`

You should then see startup notification appear telling you the app is running, this is how you know everything is working and good to go. If you see the notification, you're all set! Now just wait patiently for your 

## Open Source

#### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

#### Contributing
Contributions are welcome and encouraged! Please feel free to open issues for problems you encounter or feature requests and ideas you come up with. If you would like to contribute code, please open a pull request and describe your changes and reasoning for them. This is a fairly simple app, but there's improvements that can be made and new features that can be added. Thank you in advance for your help!
