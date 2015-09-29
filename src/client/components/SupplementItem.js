import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class SupplementItem extends Component {
   constructor(props, context) {
      super(props, context);
   }

   render() {
      const {supplement, selectSupplement} = this.props;

      return (
         <li className="supplement-list-item">
            <div className="supplement">
               <h2 className="supplement-heading">{supplement.heading}</h2>
               <div className="supplement-info-row">
                  <img className="supplement-image" src={supplement.imageUrl} />
                  <p className="supplement-info-text">{supplement.text}</p>
               </div>
               <input className="toggle supplement-toggle"
                     type="checkbox"
                     checked={supplement.selected}
                     onChange={() => selectSupplement(supplement.id)} />
               <label>{supplement.heading}</label>
            </div>
         </li>
      );
   }
}

SupplementItem.propTypes = {
   supplement: PropTypes.object.isRequired,
   selectSupplement: PropTypes.func.isRequired
};

export default SupplementItem;
