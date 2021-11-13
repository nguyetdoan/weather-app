console.log("Client side javascript is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const address = search.value;
  fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        console.log(data.location);
        console.log(data.forecast);
      }
    });
});
