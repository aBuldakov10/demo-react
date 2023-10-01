import React, { useState } from 'react';

import './Accordion.scss';

const Accordion = ({ contentAcc }) => {
  return (
    <div className="block">
      <h2>Accordion block</h2>

      <div className="accordion">
        {contentAcc.map(({ title, content, active }, index) => {
          const [activeState, setActiveState] = useState(active);
          const isActiveClass = activeState ? 'active' : '';

          return (
            <div className="accordion__item" key={index}>
              <div
                className={`accordion__title collapse-arrow ${isActiveClass}`}
                onClick={() => setActiveState(!activeState)}
              >
                {title}
              </div>

              {activeState ? (
                <div className="accordion__body">{content}</div>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Accordion;
