import inquirer from 'inquirer';
import { getAuthTokenWithCode, getURL } from './auth';
import initDB, { saveCreds, setLastRun } from './db';
import { getZeroMonth } from './helpers';

const initializeApp = async () => {
  try {
    console.log('Initializing Database');
    initDB();
    console.log('Visit the following URL to authenticate App with Gmail:');
    const authURL = await getURL();
    console.log(authURL);

    const questions = [
      {
        type: 'input',
        name: 'authCode',
        message: 'Enter Authorization Code',
      },
    ];

    const responses = await inquirer.prompt(questions);
    console.log('Getting auth token....');
    const authToken = await getAuthTokenWithCode(responses.authCode);
    console.log('Storing auth token to DB...');
    saveCreds(authToken);
    console.log('Setting other cofigurations...');
    setLastRun(getZeroMonth());
    console.log('DONE !!');
  } catch (error) {
    throw new Error(error);
  }
};

initializeApp();
