export const responceFormatter = ({status, message, data=null, error=null}) => {
  return {
    status,
    message,
    data,
    error,
  };
};
