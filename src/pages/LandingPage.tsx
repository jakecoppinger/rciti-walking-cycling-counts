import { counterLocationCoordinates, locationColours, locations, TrafficData, TrafficGraphingData } from "../types";
import {
  HeaderAndFooter,
} from "../components/HeaderAndFooter";
import {
  AttributionControl,
  FullscreenControl,
  GeolocateControl,
  Marker,
  Map as ReactMapGL
} from "react-map-gl/dist/esm/exports-mapbox"
import { Helmet } from "react-helmet-async";
import "../App.css";

import rawData from '../computed-data/traffic-daily.json';
import { LocationAverageCountsTable, MultipleLocationsTimelineFigure } from "../components/plotUtils";
import { MAPBOX_TOKEN } from "../config";
const data = rawData as TrafficData[];
const graphingData: TrafficGraphingData[] = data.map((d) => {
  const graphingData: TrafficGraphingData = {
    ...d,
    timestamp: new Date(d.timestamp),
  };
  return graphingData;
});

const TrafficTable = ({
  traffic,
}: {
  traffic: TrafficData[];
}) => {
  const headers = locations;
  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          {/* Iterate over headers in alphabetical order and create th for each */}
          {headers.toSorted().map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {traffic.map((t) => (
          <tr>
            <td>{t.timestamp}</td>
            {headers.toSorted().map((header) => (
              <td key={header}>{t[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export function LandingPage() {
  return (
    <HeaderAndFooter>
      <Helmet prioritizeSeoTags>
        <title>Analysis - rCITI Walking and Cycling Counts</title>
        <meta property="og:title" content="rCITI Walking and Cycling Counts" />
        <meta name="description" content="An analysis of rCITI Walking and Cycling Counts" />
      </Helmet>

      <p>Data released under UNSW Research Centre of Integrated Transport Innovation under CC BY-SA 4.0.</p>

      <p>This analysis site is open source under AGPL-3.0. Initially built by Jake Coppinger
        in a volunteer capacity. <a href="">Contributions on Github are very welcome!</a>
      </p>
      <p>Download the raw CSV data here:</p>
      <p>
      <ul>
        <li><a href="./data/traffic-15min.csv">traffic-15min.csv</a></li>
        <li><a href="./data/traffic-daily.csv">traffic-daily.csv</a></li>
        <li><a href="./data/traffic-hourly.csv">traffic-hourly.csv</a></li>
      </ul>
      </p>
      
      <h2>Location map</h2>
      <ReactMapGL
        initialViewState={{
          latitude: -33.85,
          longitude: 151.2019,
          zoom: 10,
        }}
        mapboxAccessToken={MAPBOX_TOKEN}
        id={"react-map"}
        style={{ width: "90vw", height: "50vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      >
        {
          // Get keys of Record:
          locations.map((location) => {
            return {
              counterName: location,
              colour: locationColours[location],
              ...counterLocationCoordinates[location]
            }
          })
            .map((counter) => (
              <Marker
                key={counter.counterName}
                latitude={counter.lat}
                longitude={counter.lon}
                onClick={() => {
                  console.log("Clicked on", counter.counterName);
                }}
                color={"red"}
              >
                <div style={{ position: 'relative' }}>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      left: '50%',
                      opacity: 0.7,
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      borderRadius: '5px',
                      padding: '2px 5px',
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {counter.counterName}
                  </div>
                  <div
                    style={{
                      width: '15px',
                      height: '15px',
                      backgroundColor: counter.colour,
                      borderRadius: '50%',
                      margin: '0 auto',
                    }}
                  />
                </div>

              </Marker>
            ))
        }
        <AttributionControl compact={false} />
        <FullscreenControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
      </ReactMapGL>


      <h2>Location summary</h2>
      <p>Each sensor was present at the following locations between the folling dates:</p>
      <table>
        <thead>
          <tr>
            <th>Location name</th>
            <th>Start date</th>
            <th>End date</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location}>
              <td>{location}</td>
              <td>{graphingData.find((d) => d[location] !== undefined)?.timestamp.toLocaleDateString()}</td>
              <td>{graphingData.reverse().find((d) => d[location] !== undefined)?.timestamp.toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Location average counts</h2>
      <LocationAverageCountsTable locations={locations} graphingData={graphingData} />


      <h2>All locations</h2>
      <MultipleLocationsTimelineFigure locationsToDraw={[...locations]} data={graphingData} />
      <h2>Full table</h2>
      <TrafficTable traffic={data} />
    </HeaderAndFooter >
  );
}
