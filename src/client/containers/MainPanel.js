import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SupplementMainList from '../components/SupplementMainList';
import * as SupplementActions from '../actions/supplements';
import * as SaveActions from '../actions/save';

class MainPanel extends Component {
  render() {
    const { supplements, dispatch, saving } = this.props;
    const actions = bindActionCreators(SupplementActions, dispatch);
    const save = bindActionCreators(SaveActions, dispatch);

    return (
      <div>
        <SupplementMainList supplements={supplements} actions={actions} />
        <div className="supplement-remove-link" onClick={() => save.saveSupplements(supplements)}>{'spara'}</div>
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
      supplements: state.supplements,
      saving: state.save
   };
}

export default connect(mapStateToProps)(MainPanel);
