import { listen } from "./listeners";

listen()
  .then(function () {
    console.log("listening started on factory contract");
  })
  .catch(function (err) {
    console.log(err);
  });
