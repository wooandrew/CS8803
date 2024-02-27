"use client";

import CustomMap from "./components/CustomMap";

export default function Home() {

  return (
    <main>


      
      <div className="flex w-screen h-screen relative flex-col bg-neutral-800">

        <div className="m-5 text-center">
          <h1 className='text-4xl font-bold'>U.S. State Park Density Choropleth</h1>
          <p className='text-lg'>Critical Cartography Assignment for CS 8803 CDP (Spring &rsquo;24)</p>
        </div>
        
        <div className="ml-auto mr-auto mt-5 w-2/3 h-3/4">
          <CustomMap />
        </div>

      </div>



    </main>
  );
}

