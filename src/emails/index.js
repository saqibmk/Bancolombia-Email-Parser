import { google } from 'googleapis';
import { getAuthObject } from '../auth/helpers';
import { getCreds, getLastRun, setLastRun, saveSnippet } from '../db';
import { lastRunGenrator } from '../helpers';
import { BANK_FROM_EMAIL } from '../constants';

const saveEmailSnippets = async (auth, message) => {
  try {
    const gmail = google.gmail('v1');
    const {
      data: { snippet }
    } = await gmail.users.messages.get({
      auth,
      userId: 'me',
      id: message.id
    });
    await saveSnippet(snippet);
    console.log('got Email');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getEmailsWithFilter = async (q, pageToken) => {
  try {
    const creds = getCreds();
    const auth = await getAuthObject(creds);
    const gmail = google.gmail('v1');
    const {
      data: { messages, nextPageToken }
    } = await gmail.users.messages.list({
      auth,
      userId: 'me',
      q,
      pageToken
    });
    if (messages) {
      for (const message of messages) {
        await saveEmailSnippets(auth, message);
      }
      console.log('next');
      if (nextPageToken) {
        console.log('moving to next page');
        getEmailsWithFilter(q, nextPageToken);
      }
      return messages.length;
    }
    return 0;
  } catch (error) {
    throw new Error(error);
  }
};

const emailSync = async () => {
  // Get emails.
  // Save snippets
  // update last run
  const emailFilter = `after:${getLastRun()} from:${BANK_FROM_EMAIL}`;
  const emailsSynced = await getEmailsWithFilter(emailFilter);
  return emailsSynced;
  // return emailsSynced;
  //console.log("here got email");
  // console.log(emailsSynced);
  // const lastRun = Math.round(lastRunGenrator());
  // setLastRun(lastRun);
  // return emailsSynced;
};

export default emailSync;
