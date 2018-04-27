### STORY

[Bancolombia](https://www.grupobancolombia.com/) is one of the biggest banks in Colombia. But like any big ol' bank, they do not have an API that I can access, and no third-party provides access to it either. They do however provide a notification email on every transaction that occurs! So, this project is basically an email parser and organizer.

### HOW IT WORKS

1.  First we authorize access to the Gmail API, so that we can search for emails sent from the bank's email address.
2.  We get the mail data, and parse and store it into a database.
3.  Profit! :money_with_wings:

All information is parsed and stored locally, so nothing goes out into the wild wild west of the internet.

### GETTING STARTED

1.  Clone the repo.
2.  Install libreries by running `yarn add`
3.  You will need to setup a project on Google Cloud project in order to access the gmail API. Refer to [Gmail API](https://developers.google.com/gmail/api/) for more information. Once you have setup the project, you should havea file called `client_secret.json`. Put the file in the root directory of this project.
4.  Run `yarn run init` to initialize the project. You should get a link in your console for authorization. Copy/Paste the link in your browser, and go through the authentication process. At the end you should get a code.
5.  Copy the code, and paste it in your console. The initializing process should continue, authenticate and get access tokens, and setup the database (db.json).
6.  You are all set!

### TODOs

* [ ] Complete Readme file with more instructions.
* [ ] Add a simple front end.
* [ ] Add unit tests.
