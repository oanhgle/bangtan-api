/* share on twitter */
function tweet() {
  const quote = document.getElementById("quote").innerHTML;
  const author = document.getElementById("author").innerHTML;
  const info = document.getElementById("info").innerHTML;
  const fullText = `${quote} - ${author} (${info})`;
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      fullText
    )}&hashtags=BTSQUOTESAPI`
  );
}

/* fetch quotes */
function getRandom() {
  fetch("https://bts-quotes-api.herokuapp.com/quote/random")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("quote").innerHTML = data.quote;
      document.getElementById("author").innerHTML = data.member;
      console.log(data.quote + " - " + data.member); //for debugging
      getInfo(data.quote);
    })
    .catch((err) => console.log(err));
}

/* fetch quote's info */
function getInfo(quote) {
  fetch("https://bts-quotes-api.herokuapp.com/quotes")
    .then((response) => response.json())
    .then((data) => {
      data.forEach(function (data) {
        if (data.quote === quote) {
          document.getElementById("info").innerHTML = data.info;
          console.log(data.info); //for debugging
        }
      });
    })
    .catch((err) => console.log(err));
}
