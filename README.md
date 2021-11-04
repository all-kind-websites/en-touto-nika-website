- Hosting URL: https://brave-pasteur-5a8c7a.netlify.app/

- Clean working time spent on the webpage: 98:13'

TODO:

- fix `(trueFalse_useTimer === "created")`
- find a way to get image from pc, and set the type of img in `saveImage = (img, prevImg)`. And then store the url in Firebase.

- show a backdrop when sidebar menu is open.
- use an alert to notify the user the error in every try/catch
- Do NOT save userData in client side!!! Instead create a userIsLoggedIn value ... and each time you need to use token or userId to get data from server, first ... oops I need a token to get the token !?
  - https://stackoverflow.com/questions/45538963/is-redux-secure
  - https://dev.to/rdegges/please-stop-using-local-storage-1i04
- what is this: index.js:1 Warning: Invalid attribute name: `0`
- If user takes a brake, save the points to server.
- In categories for mixed game, if user does not have internet and fails to download filters, show an alert message and do not download filters. If user activates internet then ...
- save points to redux => saveGradeToCache(totalPoints);
- if user clicks the back button after answering a question, clean the choice made in localstorage.
- bugfix: If user is at last question: If he presses the back button before answering the question and desides to lose the last question, or If he takes a brake with back button ... and then wants to continue the same game, he goes to GameOverPage. It's ok, but it would be better to avoid that!
- show tooltips when hovering over a cursor pointer icon
