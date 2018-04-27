### STORY

[Bancolombia](https://www.grupobancolombia.com/) is one of the biggest banks in Colombia. But like any big ol' bank, they do not have an API that I can access, and no third-party provides access to it either. They do however provide a notification email on every transaction that occurs! So, this project is basically an email parser and organizer.

### HOW IT WORKS

1.  First we authorize access to the Gmail API, so that we can search for emails sent from the bank's email address.
2.  We get the mail data, and parse and store it into a database.
3.  Profit! :money_with_wings:

All information is parsed and stored locally, so nothing goes out into the wild wild west of the internet.

### TODOs

* [ ] Complete Readme file with more instructions.
* [ ] Add a simple front end part to this.
* [ ] Add unit tests.
