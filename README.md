- fix `(trueFalse_useTimer === "created")`
- find a way to get image from pc, and set the type of img in `saveImage = (img, prevImg)`. And then store the url in Firebase.

- show a backdrop when sidebar menu is open.
- use an alert to notify the user the error in every try/catch
- mark the chosen option in a multi game with greenish color if right and redish if wrong. In case of wrong mark the right also ...
- Do NOT save userData in client side!!! Instead create a userIsLoggedIn value ... and each time you need to use token or userId to get data from server, first ... oops I need a token to get the token !?
  - https://stackoverflow.com/questions/45538963/is-redux-secure
  - https://dev.to/rdegges/please-stop-using-local-storage-1i04
- what is this: index.js:1 Warning: Invalid attribute name: `0`
- If user takes a brake, save the points to server.
- In categories for mixed game, if user does not have internet and fails to download filters, so an alert message and do not download filters. If user activates internet then ...
- save points to redux => saveGradeToCache(totalPoints);
- if user clicks the back button after answering a question, clean the choice made in localstorage. Maybe don't push to game but replace, so user will not be able to go back.
- delete export history from App
- if user navigates back from a mix game, take him to multi categories accordingly
