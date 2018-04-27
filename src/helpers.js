// get filter date
import { DateTime } from 'luxon';

export const getZeroMonth = () =>
  DateTime.local()
    .set({
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    })
    .valueOf() / 1000;

export const lastRunGenrator = () => DateTime.local() / 1000;
