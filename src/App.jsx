import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { store } from './redux/store';

const { dispatch } = store;

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { ...restProps } = this.props;
    const { ...restState } = this.props;

    return (
      <div>Hello world!</div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

App.defaultProps = {
};

const mapStateToProps = s => ({
  router: s.router,
});

export default connect(mapStateToProps)(withStyles(styles)(App));
