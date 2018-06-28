import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import { store } from '../redux/store';
import {
  setMasterCourses,
} from '../redux/actions/action-creators';

const { dispatch } = store;

const styles = () => ({

});

class BaseComponent extends React.PureComponent {
  render() {
    const {
      classes,
    } = this.props;

    return (
      <div>BaseComponent</div>
    );
  }
}

BaseComponent.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

const mapStateToProps = s => ({

});

export default connect(mapStateToProps)(withStyles(styles)(BaseComponent));
