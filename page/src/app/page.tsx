import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-between p-24 text-white bg-black">
      <div className="z-10 max-w-5xl w-full justify-between font-mono text-sm lg:flex flex-col">
        <div className="mb-6">
        Howdy. This is the landing page for my CS 8803 CDP (Spring &lsquo;24) Projects @ GeorgiaTech
        <br></br>This page is under construction.
        </div>

        <a href="/gameforge" className="text-blue-500 underline">A Tool for Generating Concepts &nbsp;&nbsp;| GameForge</a>
        <a href="/criticalcartography" className="text-blue-500 underline">Creative & Critical Cartography &nbsp;| U.S. State Park Density Choropleth</a>
        <a href="/ropd" className="text-blue-500 underline">Representations of Personal Data | Sleep Data as Waveforms</a>
      </div>
    </main>
  );
}
