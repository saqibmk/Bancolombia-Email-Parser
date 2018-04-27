export const getTime = snippet => snippet.match(/\d{2}:\d{2}/g)[0];
export const getDate = snippet => snippet.match(/\d{2}\/\d{2}\/\d{4}/g)[0];
export const getAmount = snippet => snippet.match(/\$(.*?)(?=\s)/g)[0];
export const getPlace = snippet => snippet.match(/(?<=en\s).[^\d]*/g)[0].trim();
