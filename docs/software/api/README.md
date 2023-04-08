# Wake on LAN API

## Used software/versions

- Docker
- NodeJs: v16.14.2

## Endpoints

### Status

This endpoint returns a simple 200 status code for checking if the API is reachable.

<br>


|||
|-|-|
| URI | /api/v1/status |
| Auth | none |

<br>


Request body (JSON):

No request body needed

<br>

Response body:
```
{
    'Message': 'API is online',
    'StatusCode': '200'
}
```

### Gen new token

This endpoint is used to get a new api token in case the original token was lost or should be replaced.

<br>


|||
|-|-|
| URI | /api/v1/getNewToken |
| Auth | none |

<br>


Request body (JSON):
```
{
    code1 : Reset code 1 here,
    code2 : Reset code 2 here,
    code3 : Reset code 3 here
}
```
Replace `Reset code X here` with the codes you generated using the reset token endpoint. The reset code 1 ist the code requested most recent.

<br>

Response body:
```
{
    Message: New token in body,
    NewToken: Your new token,
    StatusCode: '200'
}
```
`Your new token` will be replaced with the new api token and the old one will stop to work.

### New reset code

This endpoint generates new token reset codes. Every time a new code is generated the the last three generated codes move back by one index to make space for the newly generated code. There is a maximum of three codes and if a code should moved to the 4. index it will be deleted. When a new code is generated it will be printed to the stdio.

<br>


|||
|-|-|
| URI | /api/v1/getResetCode |
| Auth | none |

<br>


Request body (JSON):

No request body needed

<br>

Response body:
```
{
    'Message': 'The reset code has been outputted to the server cli',
    'StatusCode': '200'
}
```

### Add to WOL queue

With this endpoint you can add devices registered with the api to the WOL queue. If the device is not registered the queue request will be denied.

<br>


|||
|-|-|
| URI | /api/v1/addToQueue |
| Auth | default Auth |

<br>


Request headers:

```
id: ID of the requested WOL device
```

<br>

Response body:
```
{
    'Message': 'Request added to the queue',
    'StatusCode': '200'
}
```

### Get from WOL queue

This endpoint presents all queued devices in a orderly fashion. You will receive a client id, mac address and timestamp of queueing. 

<br>


|||
|-|-|
| URI | /api/v1/getFromQueue |
| Auth | default Auth |

<br>


Request headers:

No headers needed

<br>

Response body:
```
{
    'Message': 'Queued item in body',
    'StatusCode': '200',
    'clientId': Client ID registered on the API,
    'clientMac': Mac address of the WOL device,
    'timestamp': Timestamp of adding the WOL request to the queue
}
```


## Auth for all endpoints

## Environment variables

| Variable | Description |
|-|-|
| port | This defines the port that the express rest api will run on. |
| rateLimitPerMin | This defines the maximum request per minute by each client. The rate limiting is handled by the `express-rate-limit` package. |
| resetTokenLength | The length for one of the 3 token reset codes |
