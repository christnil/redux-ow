import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SupplementCompactList from '../components/SupplementCompactList';
import * as SupplementActions from '../actions/supplements';

class Sidebar extends Component {
  render() {
    const { supplements, dispatch } = this.props;
    const actions = bindActionCreators(SupplementActions, dispatch);

    return (
      <div>
        <SupplementCompactList supplements={supplements} actions={actions} />
      </div>
    );
  }
}

Sidebar.propTypes = {
  supplements: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    supplements: state.supplements
  };
}

export default connect(mapStateToProps)(Sidebar);
