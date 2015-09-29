import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SupplementMainList from '../components/SupplementMainList';
import * as SupplementActions from '../actions/supplements';

class MainPanel extends Component {
  render() {
    const { supplements, dispatch } = this.props;
    const actions = bindActionCreators(SupplementActions, dispatch);

    return (
      <div>
        <SupplementMainList supplements={supplements} actions={actions} />
      </div>
    );
  }
}

MainPanel.propTypes = {
  supplements: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    supplements: state.supplements
  };
}

export default connect(mapStateToProps)(MainPanel);
