const express = require('express')
const cors = require('cors')
const DiscordRPC = require('discord-rpc')

const app = express()
app.use(cors())
app.use(express.json())

const clientId = '1512388266744086608'
DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' })

rpc.on('ready', () => {
    console.log('Discord RPC Connected!')
});

app.post('/update', (req, res) => {
    const { title, author, videoId, timeNow, timeMax, isPaused } = req.body

    if (isPaused) {
        rpc.clearActivity()
    } else {
        rpc.setActivity({
            details: title.substring(0, 128),
            state: `by ${author.substring(0, 128)}`,
            startTimestamp: Math.floor(Date.now() / 1000) - timeNow,
            endTimestamp: Math.floor(Date.now() / 1000) + (timeMax - timeNow),

            largeImageKey: videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : 'youtube',
            largeImageText: 'GitHub: @hellcat-xyz',

            buttons: [
                {
                    label: 'Watch Video',
                    url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : 'https://youtube.com'
                },
                {
                    label: 'GitHub',
                    url: 'https://github.com/hellcat-xyz'
                }
            ],
            instance: true,
        });
    }
    res.sendStatus(200);
});

rpc.login({ clientId }).catch(console.error)

app.listen(3000, () => console.log('Local Server listening on port 3000'))
