const isObject = (data: any) => {
  return data && !Array.isArray(data) && data instanceof Object;
};

export const isEmptyObject = (data: Object) => {
  if (!isObject(data)) {
    return false;
  }
  return Object.keys(data).length ? false : true;
};
