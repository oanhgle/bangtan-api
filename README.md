# BTS QUOTES API 
Simple Node.js API using Express framework to retrieve inspirational quotes from BTS
<br/>
**Production Host:** Heroku
<br/>
✨Demo: https://bts-quotes-api.herokuapp.com/ 

## 🥯 API endpoints
### GET
|Endpoints | Description| |
| ------ | ------ | ------ |
|**GET/quotes** | return all quotes| https://bts-quotes-api.herokuapp.com/quotes
|**GET/quote/random**|return a random quote| https://bts-quotes-api.herokuapp.com/quote/random
|**GET/quote/id/:id**| return quote by its ID| https://bts-quotes-api.herokuapp.com/quote/id/:id
|**GET/quote/member/:member**| return an array of quotes by member |https://bts-quotes-api.herokuapp.com/quote/member/:member|
|**GET/quote/total**| return total number of quotes|https://bts-quotes-api.herokuapp.com/quote/total|

### POST
#### POST/quotes
Post new quote to the collection
<br/><br/>
**Request body:**
```json
{
    "quote" : " ",
    "member" : " ",
    "info" : " "
}
```
**Example call:**

```bash
curl -X POST -i -H "Content-Type: application/json" -d '{
    "quote" : "This is quote",
    "member" : "RM",
    "info" : "This is info"
}' https://bts-quotes-api.herokuapp.com/quotes
```
### PATCH
#### PATCH/quote/id/:id
Modify existing quote by its id
> id is mandatory in the request body

**Example call:**
```bash
curl -X PATCH -i -H "Content-Type: application/json" -d '{
  "id" : "1",
  "info": "This is how you modify info for quote id 1"
}' https://bts-quotes-api.herokuapp.com/quote/id/1 
```
## 🥨 Usage
#### Example: Get a random quote 

**fetch:**
``` javascript
fetch('https://bts-quotes-api.herokuapp.com/quote/random')
    .then(response => response.json())
    .then(data => {
        console.log(data.quote + ' - ' + data.member);
    }).catch(err => console.log(err));
```
**JQuery:**
``` javascript
$.getJSON('https://bts-quotes-api.herokuapp.com/quote/random', function(data){
    console.log(data.quote + ' - ' + data.member);
})
```

**async/await:**
``` javascript
async function getRandom(){
    const response = await fetch('https://bts-quotes-api.herokuapp.com/quote/random');
    const data = await response.json();
    console.log(data.quote + ' - ' + data.member);
}
getRandom()
```

## 🍞 Local Development
#### Install and run
``` bash
# clone the repo
$ git clone https://github.com/oanhgle/bangtan-api
$ cd bangtan-api
# install the dependencies
$ npm install 
# start the server
$ npm start
```
The server will run at `http://localhost:3000/`

#### Available scripts
Start the application `npm start `
<br/>
Start the development live-reload server `npm run dev `

## 🧀 Lisence
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](https://github.com/oanhgle/bangtan-api/blob/master/license)
