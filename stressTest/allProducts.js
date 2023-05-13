/* eslint-disable */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    stress: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 10,
      maxVUs: 10,
    },
  },
};

export default function() {
  const res = http.get(`http://localhost:3001/products`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
