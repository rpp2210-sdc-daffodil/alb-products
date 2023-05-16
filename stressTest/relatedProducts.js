/* eslint-disable */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    stress: {
      executor: 'constant-arrival-rate',
      rate: 10,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 10,
      maxVUs: 100,
    },
  },
};

const generateRandomID = () => {
  let randomID = Math.floor(Math.random() * (1000000 - 900000) + 900000);
  return randomID.toString();
}

export default function() {
  const randomID = generateRandomID();
  const res = http.get(`http://localhost:3001/products/${randomID}/related`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
