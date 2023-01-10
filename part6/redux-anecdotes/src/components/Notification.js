// import { useSelector } from 'react-redux';
import { connect } from 'react-redux';

const Notification = (props) => {
  // const notification = useSelector((state) => state.notification);
  console.log(props.notification);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  return <div style={style}>{props.notification}</div>;
};

const mapStatetoProps = (state) => ({ notification: state.notification });

// export default Notification;

export default connect(mapStatetoProps)(Notification);
