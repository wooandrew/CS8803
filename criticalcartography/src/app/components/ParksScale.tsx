import React from 'react';

interface ParksScaleProps {
  minParks: number;
  maxParks: number;
  currentParks: number;
}

const ParksScale: React.FC<ParksScaleProps> = ({ minParks, maxParks, currentParks }) => {
  const percentage = ((currentParks - minParks) / (maxParks - minParks)) * 100;

  return (
    <div className="m-auto mt-3 w-full flex justify-center">
      <p>{minParks} Parks</p>
      <div className="relative w-2/3 ml-2 mr-2" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="bg-gradient-to-r from-white to-black w-full h-full rounded"></div>
        <div className="absolute bg-green-500" style={{ width: '2px', height: '120%', left: `calc(${percentage}% - 1px)`, top: '50%', transform: 'translateY(-50%)' }}></div>
      </div>
      <p>{maxParks} Parks</p>
    </div>
  );
};

export default ParksScale;
