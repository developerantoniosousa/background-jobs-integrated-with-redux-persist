import BackgroundJob from 'react-native-background-job';
import { store, rehydration } from '../store';
import { ActionCreators as LogActions } from '../store/modules/log';

const LOG_JOB_KEY = 'jobKey';
let i = 0;
async function action() {
  try {
    console.log('times: ', ++i)
    await rehydration();
    const log = {
      id: Date.now(),
      time: Date.now(),
    };
    store.dispatch(LogActions.addLog(log));
  } catch (error) {
    console.error(error);
  }
}

export function cancel() {
  return BackgroundJob.cancel({ jobKey: LOG_JOB_KEY });
}

export default function LogJob() {
  BackgroundJob.register({
    jobKey: LOG_JOB_KEY,
    job: action,
  });

  return () => {
    BackgroundJob.schedule({
      jobKey: LOG_JOB_KEY,
      period: 1000,
    })
      .then(() => console.log(`${LOG_JOB_KEY} job has been scheduled`))
      .catch(() => console.error(`${LOG_JOB_KEY} job scheduled has failed`));
  };
}
