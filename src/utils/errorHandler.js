import {toast} from '../components/Common/Toast';
import {ToastErrors} from '../constant/toastErrorSuccess';
import {ERROR_CODE_567, ERROR_CODE_569} from '../constant';
import {APIErrors} from './apiErrors';

const errorHandler = (err, isShowDefaultNotification = true) => {
  if (err?.response && err?.response?.status == ERROR_CODE_567) {
    const errorData = err?.response?.data;
    const exception = new Error();
    exception.response = {
      status: errorData?.status,
      message: errorData?.message,
      code: errorData?.code,
    };
    throw exception;
  }

  let message;
  message = err.response ? err.response.data : err.message;
  const status = err.response ? err.response.status : 500;
  const code = err.response && err.response.data ? err.response.data.code : 0;
  if (message && message.message) {
    message = message.message;
  }

  /*
     this is for to show common toast error
     - check api error message contains in APIErrors
     - if it finds set initial showCustomToastMessage= false
     - show toast message
     - then showCustomToastMessage= true, so from any catch block it will skip
     -(logic is - find error-> if it's find -> display common toast -> set flag to skip any custom error handling from catch block
   */
  let isAPIMessage = APIErrors.find(e =>
    message.toLowerCase().includes(e.apiMessage.toLowerCase()),
  );
  const error = {
    status: status,
    message: message,
    code: code,
    ...(isAPIMessage
      ? {...isAPIMessage, ...{showCustomToastMessage: false}}
      : ''),
  };

  if (typeof window !== 'undefined' && isShowDefaultNotification) {
    if (status == 401 && code == ERROR_CODE_569) {
      toast.error(ToastErrors.COGNITO_AUTH_ERROR);
      setTimeout(() => {
        window.location.href = '/logout';
      }, 4000);
      return;
    } else {
      toast.error(ToastErrors.SOMETHING_WENT_WRONG, '', {response: error});
    }
  }

  if ('showCustomToastMessage' in error) {
    error.showCustomToastMessage = true;
  }

  const exception = new Error();
  exception.response = {
    ...error,
  };
  throw exception;
};

export default errorHandler;
