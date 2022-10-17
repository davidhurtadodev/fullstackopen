export const Notification = ({ notificationName, errorMsg }) => {
  if (!notificationName && !errorMsg) {
    return null;
  } else if (notificationName) {
    return <div className="notification">{`${notificationName} added`}</div>;
  } else if (errorMsg) {
    return <div className="notification">{errorMsg}</div>;
  }
};
