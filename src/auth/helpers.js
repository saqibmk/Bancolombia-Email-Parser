import fs from "fs";
import { OAuth2Client } from "google-auth-library";
import { promisify } from "util";
import { GMAIL_ACCESS_TYPE, GMAIL_OAUTH_SCOPES } from "../constants";

const readAuthFile = async () => {
  try {
    const readFile = promisify(fs.readFile);
    const data = await readFile("../client_secret.json");
    // console.log(JSON.parse(data));
    return JSON.parse(data);
  } catch (error) {
    throw new Error(error);
  }
};

// Returns a oauth2Client object for API calls
export const getAuthObject = async creds => {
  try {
    const {
      web: { client_id, client_secret, redirect_uris }
    } = await readAuthFile();
    const auth = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
    if (creds) auth.credentials = creds;
    return auth;
  } catch (error) {
    throw new Error(error);
  }
};

const authURLGenerator = authObject =>
  authObject.generateAuthUrl({
    access_type: GMAIL_ACCESS_TYPE,
    scope: GMAIL_OAUTH_SCOPES
  });

export const getAuthURL = async () => {
  try {
    const authObject = await getAuthObject();
    return authURLGenerator(authObject);
  } catch (error) {
    throw new Error(error);
  }
};
