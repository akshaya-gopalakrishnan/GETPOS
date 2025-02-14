import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

const Slider = ({setContent}) => {
  // Initial sliders state with unique IDs and default values
  const [sliders, setSliders] = useState({});

  // Function to handle changes in any slider
  const handleSliderChange = (sliderId, value) => {
    setSliders((prevSliders) => ({
      ...prevSliders,
      [sliderId]: { ...prevSliders[sliderId], value: parseInt(value, 10) }, // Ensure value is an integer
    }));
  };
  useEffect(()=>{
    setContent(sliders)
  }, [sliders])
  // Function to handle label change
  const handleLabelChange = (sliderId, newLabel) => {
    setSliders((prevSliders) => ({
      ...prevSliders,
      [sliderId]: { ...prevSliders[sliderId], label: newLabel }, // Update the label
    }));
  };

  // Function to add a new slider
  const addSlider = () => {
    const newSliderId = `content${Object.keys(sliders).length + 1}`;
    setSliders((prevSliders) => ({
      ...prevSliders,
      [newSliderId]: { value: 50, label: newSliderId }, // Default value and label
    }));
  };

  // Function to remove a slider
  const removeSlider = (sliderId) => {
    const { [sliderId]: _, ...remainingSliders } = sliders;
    setSliders(remainingSliders);
  };

  return (
    <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
      {/* Loop through the sliders object to create a dynamic list of sliders */}
      {Object.keys(sliders).map((sliderId) => (
        <div key={sliderId} className="slider-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          {/* Editable label for each slider */}
          <input 
            type="text" 
            value={sliders[sliderId].label} 
            onChange={(e) => handleLabelChange(sliderId, e.target.value)} 
            style={{
              flex: 1, 
              marginRight: '5px', 
              maxWidth: "140px",
              border: 'none',               // Remove all borders
              // borderBottom: '1px solid #000' // Only keep bottom border
            }}
          />
          <input
            type="range"
            id={sliderId}
            min="0"
            max="100"
            value={sliders[sliderId].value}
            onChange={(e) => handleSliderChange(sliderId, e.target.value)}
            style={{ flex: 3, marginRight: '10px' }}
          />
          {sliders[sliderId].value}%{" "}
          <p onClick={() => removeSlider(sliderId)} style={{ cursor: 'pointer'}}>
            <Button>Remove</Button>
          </p>
        </div>
      ))}

      <p style={{ fontSize: "10px", cursor: 'pointer', textAlign: 'right' }} onClick={addSlider}>
        <Button>Add Content</Button>
      </p>
    </div>
  );
};

export default Slider;
