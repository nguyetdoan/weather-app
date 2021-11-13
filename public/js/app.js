console.log("Client side javascript is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-one");
const messageTwo = document.querySelector("#message-two");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  messageOne.textContent = "Loading...";
  fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        messageOne.textContent = data.err;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
});
