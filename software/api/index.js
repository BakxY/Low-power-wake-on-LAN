const app = require('express')()
const express = require('express')
const rateLimiter = require('express-rate-limit')
const fs = require('fs')

// setup rate limiter
const rateLimit = rateLimiter({
    max: process.env.rateLimitPerMin,
    windowMs: 60 * 1000
})

var TokenResetCodes = [randomStr(process.env.resetTokenLength), randomStr(process.env.resetTokenLength), randomStr(process.env.resetTokenLength)]

app.use(rateLimit)
app.use(express.json())

app.listen(
    3002,
    '0.0.0.0',
    () => console.log('Auth API on port 3002')
)

app.get('/api/v1/status', async (req, res) => {
    res.status(200).json({
        'Message': 'API is online',
        'StatusCode': '200'
    })
    
    return
})

app.get('/api/v1/getResetCode', async (req, res) => {
    var resetCode = randomStr(process.env.resetTokenLength)

    TokenResetCodes[3] = TokenResetCodes[2]
    TokenResetCodes[2] = TokenResetCodes[1]
    TokenResetCodes[1] = resetCode

    console.log('[ TOKEN ] Client requested new reset code: "' + resetCode + '"')

    res.status(200).json({
        'Message': 'The reset code has been outputted to the server cli',
        'StatusCode': '200'
    })
    
    return
})

app.get('/api/v1/getNewToken', async (req, res) => {
    const reqJson = req.body

    if(reqJson.hasOwnProperty('code1') && reqJson.hasOwnProperty('code2') && reqJson.hasOwnProperty('code3'))
    {
        if(reqJson['code1'] == TokenResetCodes[1], reqJson['code2'] == TokenResetCodes[2], reqJson['code3'] == TokenResetCodes[3])
        {
            var newToken = randomStr(64)

            var TokenData = { 
                newToken : {
                    'creation': new Date().getTime()
                }
            }

            fs.writeFileSync('./data/token.json', JSON.stringify(TokenData));

            res.status(200).json({
                'Message': 'New token in body',
                'NewToken': newToken,
                'StatusCode': '200'
            })
            
        }
        else
        {
            res.status(401).json({
                'Message': 'Codes don\'t match',
                'StatusCode': '403'
            })
            
        }
    }
    else
    {
        res.status(400).json({
            'Message': 'Your request was incomplete',
            'StatusCode': '400'
        })
        
    }
})

app.post('/api/v1/addToQueue', async (req, res) => {
    const auth = req.headers.auth
    const clientId = req.headers.id

    if(await checkToken(auth))
    {
        var clientData = await JSON.parse(await fs.promises.readFile('./data/wol-clients.json', 'utf8'))

        if(clientData.hasOwnProperty(clientId))
        {
            var queueData = await JSON.parse(await fs.promises.readFile('./data/wol-queue.json', 'utf8'))

            queueData[parseInt(queueData['last']) + 1] = {
                "clientId": clientId,
                "timestamp": new Date().getTime()
            }

            queueData['last'] = parseInt(queueData['last']) + 1

            fs.writeFileSync('./data/wol-queue.json', JSON.stringify(queueData))

            res.status(200).json({
                'Message': 'Request added to the queue',
                'StatusCode': '200'
            })
            
        }
        else
        {
            res.status(400).json({
                'Message': 'Your request was incomplete',
                'StatusCode': '400'
            })
            
        }
    }
    else
    {
        res.status(401)
        res.json({
            'Message': 'You are not allowed to access this resource',
            'StatusCode': '401'
        })
        
    }
})

app.get('/api/v1/getFromQueue', async (req, res) => {
    const auth = req.headers.auth

    if(await checkToken(auth))
    {
        var clientData = await JSON.parse(await fs.promises.readFile('./data/wol-clients.json', 'utf8'))

        var queueData = await JSON.parse(await fs.promises.readFile('./data/wol-queue.json', 'utf8'))

        if(parseInt(queueData['last']) >= parseInt(queueData['next']))
        {
            const wolQueueClient = queueData[queueData['next']]['clientId']

            res.status(200).json({
                'Message': 'Queued item in body',
                'StatusCode': '200',
                'clientId': wolQueueClient,
                'clientMac': clientData[wolQueueClient]['mac'],
                'timestamp': queueData[queueData['next']]['timestamp']
            })

            delete queueData[queueData['next']]

            queueData['next'] = parseInt(queueData['next']) + 1

            fs.writeFileSync('./data/wol-queue.json', JSON.stringify(queueData))
        }
        else
        {
            res.status(206).json({
                'Message': 'No item in queue',
                'StatusCode': '206'
            })
        }
    }
    else
    {
        res.status(401).json({
            'Message': 'You are not allowed to access this resource',
            'StatusCode': '401'
        })
    }
})

app.post('/api/v1/addClient', async (req, res) => {
    const auth = req.headers.auth

    if(await checkToken(auth))
    {
        var clientData = await JSON.parse(await fs.promises.readFile('./data/wol-clients.json', 'utf8'))

        const reqJson = req.body

        if(reqJson.hasOwnProperty('mac') && reqJson.hasOwnProperty('ip') && reqJson.hasOwnProperty('alias'))
        {
            clientData[clientData['nextId']] = {
                "ip": reqJson['ip'],
                "mac": reqJson['mac'],
                "alias": reqJson['alias']
            }

            clientData['nextId'] = parseInt(clientData['nextId']) + 1

            fs.writeFileSync('./data/wol-clients.json', JSON.stringify(clientData))

            res.status(200).json({
                'Message': 'Client added',
                'StatusCode': '200'
            })
            
        }
        else
        {
            res.status(400).json({
                'Message': 'Your request was incomplete',
                'StatusCode': '400'
            })
            
        }
    }
    else
    {
        res.status(401).json({
            'Message': 'You are not allowed to access this resource',
            'StatusCode': '401'
        })
        
    }
})

app.get('/api/v1/getClients', async (req, res) => {
    const auth = req.headers.auth

    if(await checkToken(auth))
    {
        var clientData = await JSON.parse(await fs.promises.readFile('./data/wol-clients.json', 'utf8'))

        res.status(200).json({
            'Message': 'List is in body',
            'StatusCode': '200',
            'ClientList': clientData
        })
        
    }
    else
    {
        res.status(401).json({
            'Message': 'You are not allowed to access this resource',
            'StatusCode': '401'
        })
        
    }
})

app.delete('/api/v1/removeClient', async (req, res) => {
    const auth = req.headers.auth
    const id = req.headers.id

    if(await checkToken(auth))
    {
        var clientData = await JSON.parse(await fs.promises.readFile('./data/wol-clients.json', 'utf8'))

        if(clientData.hasOwnProperty(id) && id != 'nextId')
        {
            delete clientData[id]

            fs.writeFileSync('./data/wol-clients.json', JSON.stringify(clientData))

            res.status(200).json({
                'Message': 'Client was removed',
                'StatusCode': '200'
            })
            
        }
        else
        {
            res.status(400).json({
                'Message': 'Invalid id',
                'StatusCode': '400'
            })
        }
    }
    else
    {
        res.status(401).json({
            'Message': 'You are not allowed to access this resource',
            'StatusCode': '401'
        })
        
    }
})

async function checkToken(token)
{
    const data = await JSON.parse(await fs.promises.readFile('./data/token.json', 'utf8'))

    if(data.hasOwnProperty(token) && token != '')
    {
        return 1
    }

    return 0
}

function randomStr(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for(var i = 0; i < length; i++) 
    {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}