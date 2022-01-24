const router = require("express").Router();
let quotesDB = require("./data/data");
let purpleCount = 0;

/*
 **--------------------GET------------------**
 */

/*
 * return all quotes
 */
router.get("/quotes", function (req, res) {
  res.status(200).json(quotesDB);
});

/*
 * return quote by its id
 */
router.get("/quote/id/:id", function (req, res) {
  // search for quote by id
  const quote = quotesDB.find(
    (quote) => parseInt(quote.id) === parseInt(req.params.id)
  );
  if (!quote) return res.status(404).json({ error: "quote not found" });
  return res.status(200).json({
    ...quote,
  });
});

/*
 * return an array of quotes by member
 */
router.get("/quote/member/:member", function (req, res) {
  const search_member = req.params.member;

  // check if member is in quotesDB
  let quotes = quotesDB.filter((bangtan) => bangtan.member === search_member);

  if (!quotes.length)
    return res.status(404).json({ error: "member not found" });

  quotes = quotes.map((bangtan) => bangtan.quote);

  return res.status(200).json(quotes);
});

/*
 * return total number of quotes
 */
router.get("/quote/total", function (req, res) {
  const total = quotesDB.length;
  return res.status(200).json("Total number of quotes: " + total);
});

/*
 * return a random quote
 */
router.get("/quote/random", function (req, res) {
  const random = quotesDB[Math.floor(Math.random() * quotesDB.length)];
  res.status(200).json({ quote: random.quote, member: random.member });
});

/*
 * get purple count
 */
router.get("/i-purple-you", function (req, res) {
  purpleCount++;
  res.status(200).json({
    message: "💜I PURPLE YOU 💜",
    purpleCount,
  });
});

/*
 ***--------------------POST-------------------**
 */

router.post("/quotes", (req, res) => {
  // get quotes length
  let num = Object.keys(quotesDB).length;

  // fail if id exists is quotesDB
  if (
    quotesDB.find((bangtan) => parseInt(bangtan.id) === parseInt(req.body.id))
  ) {
    return res.status(404).json({ error: "id already exists" });
  }

  // fail to post if member's name is invalid
  if (!quotesDB.find((bangtan) => bangtan.member === req.body.member)) {
    return res.status(404).json({ error: "invalid member" });
  }

  // fail if quote and info is empty
  if (!req.body.quote || !req.body.info) {
    return res.status(404).json({ error: "quote and info cannot be empty" });
  }

  quotesDB.push({
    id: req.body.id || ++num,
    quote: req.body.quote,
    member: req.body.member,
    info: req.body.info,
  });

  return res
    .status(201)
    .send(
      "Message: Quote is added *^^* Thank you 💜\n*---Here is your reciept---*\nid: " +
        num +
        "\nquote: " +
        req.body.quote +
        "\nmember: " +
        req.body.member +
        "\ninfo: " +
        req.body.info +
        "\n"
    );
});

/*
 * post like

router.post('/i-purple-you', (req, res) =>  {
  purpleCount++;
  return res.status(200).json({status: "sucessfully"});
});
*/

/*
 ***--------------------PATCH----------------------**
 *            modify existing quote by id
 */

router.patch("/quote/id/:id", (req, res) => {
  const quote_id = req.params.id;
  const quote_update = req.body;

  // fail if quote doesn't exist
  let target_quote = quotesDB.findIndex(
    (bangtan) => parseInt(bangtan.id) === parseInt(quote_id)
  );

  if (target_quote === -1) {
    return res.status(404).json({ error: "quote doesn't exist" });
  }

  if (Object.keys(quote_update).includes("id")) {
    return res
      .status(405)
      .json({ error: "it is not allowed to update the id" });
  }

  // fail to post if member's name is invalid
  if (!quotesDB.find((bangtan) => bangtan.member === quote_update.member)) {
    return res.status(404).json({ error: "invalid member" });
  }

  if (!quote_update.quote || !quote_update.info) {
    return res.status(404).json({ error: "quote and info cannot be empty" });
  }

  // update the quote in DB
  quotesDB[target_quote] = { ...quotesDB[target_quote], ...quote_update };

  return res.status(200).json({
    message: "Successfully updated *^^* Thank you 💜",
    quote: quotesDB[target_quote],
  });
});

/*--------------------DELETE-----------------------**/
router.delete("/quotes/:id", (req, res) => {
  const id = req.params.id;
  // delete from array by id
  const newQuotes = quotesDB.filter(
    (bangtan) => parseInt(bangtan.id) !== parseInt(id)
  );

  if (newQuotes.length === quotesDB.length) {
    return res.status(404).json({ error: "quote doesn't exist" });
  }

  quotesDB = newQuotes;

  return res.status(200).json({
    message: "Deleted! ",
  });
});

module.exports = router;
