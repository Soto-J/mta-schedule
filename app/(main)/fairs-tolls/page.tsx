const FairsAndTollsPage = () => {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-5xl font-bold">
          Everything you need to know about fares and tolls in New York
        </h2>
        <p className="mt-4 text-2xl">
          Find out how much it costs to ride the subway, the bus, Long Island
          Rail Road, and Metro-North in the New York area, how transfers work,
          your options for reduced fares, and where to buy tickets or a
          MetroCard.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <div className="flex gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold">Subways and buses</h3>
            <ul className="mt-4">
              <li className="">
                Fare for most riders on subways and local, limited, and Select
                Bus Service buses: $2.90.
              </li>
              <li>Express buses cost $7.</li>
              <li>
                <a href="https://omny.info/">Tap to pay your fare</a>
                with your contactless credit/debit card, smartphone, or OMNY
                card, or pay with a MetroCard.
              </li>
            </ul>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl font-semibold">
              Railroads: LIRR and Metro-North
            </h3>
            <ul className="mt-4">
              <li>
                Buying tickets on your phone with TrainTime is the most
                convenient option.
              </li>
              <li>Save on trips within New York City with CityTicket.</li>
            </ul>
          </div>
        </div>

        <h3 className="mt-12 text-2xl font-semibold">
          About subway and bus fares
        </h3>
        <div className="mt-4 flex">
          <div>
            Tap to ride with OMNY. When you tap to ride with your contactless
            credit or debit card, smartphone, or wearable device, you don’t have
            to worry about reloading a MetroCard.{" "}
            <a href="https://omny.info/">Learn more.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FairsAndTollsPage;
