# YouTube Discord RPC

A custom Discord Rich Presence script that shows what YouTube video you're currently watching. It updates dynamically, shows the actual video thumbnail, and includes clickable buttons for the video link and your GitHub profile. 

Unlike pre-packaged RPC apps, this runs locally via Node.js so you own the Discord Application and can see exactly what the code is doing.

## Prerequisites

Before you start, you need two things installed:
* [Node.js](https://nodejs.org/en/download/) (to run the background server)
* [Tampermonkey](https://www.tampermonkey.net/) extension for your web browser (to read the YouTube page)

## Setup Instructions

### 1. Create a Discord App
* Go to the [Discord Developer Portal](https://discord.com/developers/applications).
* Click **New Application** and name it "YouTube" (or whatever you want your status to say, e.g., "Playing **YouTube**").
* Go to **General Information** and copy your **Application ID**.

### 2. Set Up the Local Server
This is the background script that talks to Discord.

* Clone or download this repository to your computer.
* Open a terminal inside the folder and install the required packages:

```bash
npm install
```

* Open `index.js` in a text editor.
* Replace the `clientId` value at the top with the Application ID you copied from Discord.
* *(Optional: Change the GitHub username in the `largeImageText` and `buttons` array to your own).*

### 3. Install the Browser Script
This script grabs the video info and sends it to your local server.

* Click the Tampermonkey extension icon in your browser and select **Create a new script**.
* Delete the default code.
* Copy the entire contents of `userscript.js` (from this repo) and paste it into the Tampermonkey editor.
* Hit **File -> Save** (or `Ctrl+S`). Make sure the script is enabled.

## How to Use

* Open a terminal in the folder where `index.js` is located.
* Run the server:

```bash
node index.js
```

* Keep that terminal window open in the background. 
* Open Discord, head to YouTube, and play a video. Your Discord status will update within a few seconds.

*(Note: Discord hides your own profile buttons from you. If you click your own profile, you won't see them, but your friends will!)*
