import React, { Component, PropTypes } from 'react';
import SupplementItem from './SupplementItem';

class SupplementMainList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { supplements, actions } = this.props;

    return (
      <section className="supplements">
        <ul className="supplement-list unstyled-list">
          {supplements.map(supplement =>
            <SupplementItem key={supplement.id} supplement={supplement} {...actions} />
          )}
        </ul>
      </section>
    );
  }
}

SupplementMainList.propTypes = {
  supplements: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default SupplementMainList;
