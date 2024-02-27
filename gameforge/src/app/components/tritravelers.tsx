// Next.js port of Tri Traverlers Animation by Nate Wiley

const TriTravelers = () => {

  return (
    <div className="wrap">
      {Array.from({ length: 200 }, (_, index) => (
        <div key={index} className="tri" />
      ))}
    </div>
  );
};

export default TriTravelers;
