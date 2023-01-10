import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    // dispatch(setFilter(event.target.value));
    props.setFilter(event.target.value);

    // input-field value is in variable event.target.value
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

export default connect(null, mapDispatchToProps)(Filter);

// export default Filter;
