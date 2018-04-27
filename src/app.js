import emailSync from './emails';
import { clearSnippet } from './db';
import emailParser from './parser';

const app = async () => {
  const emailsSynced = await emailSync();
  if (emailsSynced > 0) {
    console.log('Parsing Emails...');
    await emailParser();
    console.log('Done!');
  } else console.log('No new emails found');
};

app();
