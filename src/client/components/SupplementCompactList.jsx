import React, { Component, PropTypes } from 'react';

class SupplementCompactList extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { supplements, actions } = this.props;

    const filteredSupplements = supplements.filter(supplement => supplement.selected)
    const totalprice = filteredSupplements.reduce((count, supplement) =>
      count + supplement.price,
      0
   );

    return (
      <section className='supplements-summary'>
        <div className='supplement-summary-list'>
          {filteredSupplements.map(supplement =>
            <div key={supplement.id} className='supplement-summary'>
               <div className='supplement-name'>{supplement.heading}</div>
               <div className='supplement-price-component'>
                  <div className='supplement-price'>{supplement.price}</div>
                  <div className='supplement-remove-link' onClick={() => actions.selectSupplement(supplement.id)}>{'ta bort'}</div>
               </div>
            </div>
          )}
       </div>
        <div className={'summary-price' + (totalprice ? '' : ' hidden')}>
           Totalt: {totalprice}
        </div>
      </section>
    );
  }
}

SupplementCompactList.propTypes = {
  supplements: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default SupplementCompactList;
