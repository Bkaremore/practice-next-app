export const debounce = (fn, time) => {
  let timeout;
  return function () {
    const functionCall = () => fn?.apply(this, arguments);
    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

export const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

export const nodeErrHandler = (res, err) => {
  console.log('--BFF Error--');
  let message = err.response ? err.response.data : err.message;
  const status = err.response ? err.response.status : 500;
  const code = err.response && err.response.data ? err.response.data.code : 0;
  if (message && message.message) {
    message = message.message;
  }
  if (isEmpty(res)) {
    console.error('status', status);
    console.error('message', message);
    console.error('code', code);
  } else {
    return res.status(status).send({
      status,
      message,
      code,
    });
  }
};
