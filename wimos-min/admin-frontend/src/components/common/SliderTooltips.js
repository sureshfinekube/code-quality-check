/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

const sliderHandle = ({ value, dragging, index, offset, ...restProps }) => {
  const positionStyle = {
    position: 'absolute',
    left: `${offset}%`,
    top: '150%',
  };
  const positionVerticalStyle = {
    position: 'absolute',
    top: `${90 - offset}%`,
  };

  return (
    <span key={index}>
      <div
        className="rc-slider-tooltip"
        style={restProps.vertical ? positionVerticalStyle : positionStyle}
      >
        {`${value}`}
      </div>
      <Slider.Handle value={value} offset={offset} {...restProps} />
    </span>
  );
};

const SliderTooltip = (props) => <Slider handle={props.handle || sliderHandle} {...props} />;

const RangeTooltip = (props) => <Range handle={props.handle || sliderHandle} {...props} />;
export { SliderTooltip, RangeTooltip };
