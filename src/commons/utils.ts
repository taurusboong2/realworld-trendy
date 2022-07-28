import * as _ from 'lodash';

export const isEmptyObj = (obj: object) => {
  if (obj.constructor === Object && _.isEmpty(obj)) {
    return true;
  }
  return false;
};
