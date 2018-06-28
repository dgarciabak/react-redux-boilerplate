import React from 'react';
import PropTypes from 'prop-types';
import App from './App';
import { store } from './redux/store';
import { setStudentInfo } from './redux/actions/action-creators';

const { dispatch } = store;

class Home extends React.Component {
  componentDidMount() {}

  render() {
    const { auth } = this.props;

    return (
      <App auth={auth} />
    );
  }
}

Home.propTypes = {
  auth: PropTypes.shape({}).isRequired,
};

export default Home;
