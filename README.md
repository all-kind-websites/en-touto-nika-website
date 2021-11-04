- Hosting URL:
- [en touto nika -in netlify](https://brave-pasteur-5a8c7a.netlify.app/)
- [en touto nika -in heroku](https://en-touto-nika.herokuapp.com/)

NOTE: The webapp is not ready yet! It's a greek orthodox christian quiz.\
And yes... it's all in greek 😊.\
If you want to play just click the first card, and then again the fist card.\
Then if you get the modal, don't worry, just click in one of the buttons, and then choose categories.\
If you want just 3 questions choose only the third category. The game will finish.\
You'll be navigated to the GameOver screen, where you can press the last word 'Επιστροφή', and be navigated to home.\
It's very nice!\
When you see the multiple choices just click on one of them. Then you see with animations if you're right or wrong.\
Then you get the detailed answer, and two icons, a cup to get a break and an arrow to next question.
If user gets a brake everything is saved and when comes back, may continue or start a new one.

Unfortunately the UI in the hosted addresses above is off.\
Namely the `Topbar` and the `sidedrawer` are not visible and there is a `Loader` spinning on the home page.
I tried to host it to `firebase`, `github-pages`, `netlify` and `heroku`, with no better luck.\
Anyway I still need to work on it and find the bugs.\
Thank you for your understanding.\
If you download the repo though and you run it in your machine it works!\
Ofcourse then you need the `api_key` to make requests to firebase.\
Please ask me to send it to you.\

Thanks again.

- Time spent on the webpage: 98:13'

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
