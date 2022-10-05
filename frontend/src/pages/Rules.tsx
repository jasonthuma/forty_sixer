const Rules: React.FC = () => {
  return (
    <>
      <div className="app-body">
        <div className="rules-img pb-3">
          <div className="container pt-5">
            <div className="row align-itmes-center justify-content-center">
              <div className="col text-center pt-4">
                <h1>High Peaks Region - Hiking Rules</h1>
              </div>
            </div>
            <div className="row align-itmes-center justify-content-end rules-body">
              <div className="col-lg-6 mt-3">
                <ol>
                  <h5>
                    <li>
                      Follow the seven Leave No Trace principles in an effort to
                      protect the Adirondacks:
                    </li>
                  </h5>
                  <ol className="mb-2">
                    <li>Plan Ahead and Prepare</li>
                    <li>Travel & Camp on Durable Surfaces</li>
                    <li>Dispose of Waste Properly</li>
                    <li>Leave What You Find</li>
                    <li>Minimize Campfire Impacts</li>
                    <li>Respect Wildlife</li>
                    <li>Be Considerate of Others</li>
                  </ol>
                  <h5>
                    <li>Limit for day group hiking is 15 people</li>
                  </h5>
                  <h5>
                    <li>
                      Do not remove items such as rocks, plants, etc. on your
                      hike
                    </li>
                  </h5>
                  <h5>
                    <li>Remain on trails at all times</li>
                  </h5>
                  <h5>
                    <li>Bring necessary items</li>
                  </h5>
                  <h5>
                    <li>Wear proper clothing and shoes</li>
                  </h5>
                  <h5>
                    <li>Don't use soap within 150 feet of water</li>
                  </h5>
                  <h5>
                    <li>
                      Dispose of human waste properly—by digging a cat hole,
                      using a privy, or packing it out
                    </li>
                  </h5>
                  <h5>
                    <li>
                      Bear canisters are required for overnight hikes in the
                      Eastern High Peaks Wilderness from April 1 - November 30
                    </li>
                  </h5>
                  <h5>
                    <li>
                      Camping is prohibited above elevations of 4,000 feet
                    </li>
                  </h5>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rules;
