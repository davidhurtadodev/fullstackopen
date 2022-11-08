export const Notification = ({ error, notification }) => {
  return (
    <div>
      {notification && <p style={{ color: 'green' }}>{notification}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
