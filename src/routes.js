const router = require('express').Router();
const quotesDB = require('./data/data');
var purpleCount = 0;

/*
**--------------------GET------------------**
*/

/*
 * return all quotes
 */
router.get('/quotes', function (req, res) {
  res.status(200).json(quotesDB);
});

/*
 * return quote by its id
 */
router.get('/quote/id/:id', function (req, res) {
  const search_id = req.params.id;
  for (let bangtan of quotesDB){  
   if (bangtan.id === search_id) {
      return res
        .status(200)
        .json({
          quote: bangtan.quote,
          member: bangtan.member,
          info: bangtan.info });
    }
  }
  res.status(404).json({ error : 'invalid ID' });
});

/*
 * return an array of quotes by member 
 */
router.get('/quote/member/:member', function (req, res) {
  const search_member = req.params.member;
  console.log(search_member);
  let obj = quotesDB.filter(bangtan => bangtan.member.toLowerCase() === search_member.toLowerCase()).map(bangtan => bangtan.quote);
  (obj === undefined || obj.length == 0) ? res.status(404).json({ error : 'member not found'}) : res.status(200).json(obj);
});

/*
 * return total number of quotes
 */
router.get('/quote/total', function (req, res){
  var num = Object.keys(quotesDB).length;
  return res.status(200).json('Total number of quotes: ' + num);
});

/*
 * return a random quote
 */
router.get('/quote/random', function (req, res){
  var random = quotesDB[Math.floor(Math.random() * quotesDB.length)];
  res.status(200).json({quote: random.quote, member: random.member});
  console.log(random.quote);
});

/*
 * get purple count
 */
router.get('/i-purple-you', function (req, res) {
  purpleCount++;
  res.status(200).json({
    message: 'i purple you 💜',
    purple: purpleCount
  })
});

/*
***--------------------POST-------------------**
*/

router.post('/quotes', (req, res) => {

  //update id automatically
  var num = Object.keys(quotesDB).length;
  if (!req.body.id) {
    num++
    req.body.id = num.toString();
  }

  //fail to post if member's name is invalid
  let obj = quotesDB.filter(bangtan => bangtan.member === req.body.member);
  if (obj === undefined || obj.length == 0) {
    console.log('invalid member');
    return res
      .status(404)
      .json({error : 'invalid member'});
  }
  else {
    quotesDB.push({
      id : req.body.id || null,
      quote : req.body.quote || null,
      member : req.body.member || null,
      info: req.body.info || null
    });
    console.log(req.body.id + '\n' +req.body.quote + '\n' +req.body.member + '\n' + req.body.info);
    return res
      .status(201)
      .send('Message: Quote is added *^^* Thank you 💜\n*---Here is your reciept---*\nid: '
            + req.body.id 
            + '\nquote: ' + req.body.quote 
            + '\nmember: '+ req.body.member
            + '\ninfo: '+ req.body.info + '\n');
  }
});

/*
 * post like
 */
router.post('/i-purple-you', (req, res) =>  {
  purpleCount++;
  return res.status(200).json({status: "sucessfully"});
});


/*
***--------------------PATCH----------------------**
*            modify existing quote by id
*/

router.patch('/quote/id/:id', (req, res) => {
  const quote_id  = req.params.id;
  const quote_update = req.body;
  var arr = [];

  for (let quote of quotesDB) {
    if (quote.id == quote_id) {
      arr.push('id: ' + quote_id);
      if (quote_update.id != null || undefined)
      {
        return res
          .status(405)
          .json({ error : 'you\'re not allowed to update id'}); 
      } 
      if (quote_update.quote != null || undefined)
      {
        quote.quote = quote_update.quote;
        arr.push('\nquote: ' + quote.quote );
      }
      if (quote_update.member != null || undefined)
      {
        let obj = quotesDB.filter(bangtan => bangtan.member === quote_update.member);
        if (obj === undefined || obj.length == 0) {
          return res
          .status(404)
          .json({ error : 'invalid member'}); 
        }
        else {
          quote.member = quote_update.member;
          arr.push('\nmember: ' + quote.member);
        }
      }
      if (quote_update.info != null || undefined)
      {
        quote.info = quote_update.info;
        arr.push('\ninfo: ' + quote.info);
      }

      console.log('Updated!');
      return res
        .status(200)
        .send('Message: Successfully updated *^^* Thank you 💜\n*---Here is your reciept---*\n' + arr + '\n');
    }
  }
  res.status(404).json({
    error: 'invalid id'
  });
});

/*--------------------DELETE-----------------------**
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  for (let quotes of quotesDB) {
    if (quotes.id == id) {
      quotesDB.splice(quotesDB.indexOf(quotes), 1);
      return res.status(200).json({
        message: 'Deleted! '
      });
    }
  }
  res.status(404).json({ error: 'invalid ID' });
});
*/

module.exports = router;