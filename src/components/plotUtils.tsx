import { locationColours, LocationKeys, TrafficGraphingData } from "../types";
import * as Plot from "@observablehq/plot";
import { PlotFigure } from "./Observable/PlotFigure";

/**
 * Draws a line graph with one or more locations.
 * The x axis is narrowed so that there is at least one line at each end of the graph.
 */
export function MultipleLocationsTimelineFigure({ data, locationsToDraw }: {
  data: TrafficGraphingData[]
  locationsToDraw: LocationKeys[]
}) {
  const relevantData = data.filter((d) =>
    // For each location in locationsToDraw, check if it is in the data.
    // If none of the locations are defined in the data, return false (and don't include it in the graph)
    locationsToDraw.some((location) => d[location] !== undefined)
  );
  return <PlotFigure options={{
    // Plot.ruleY([0]),
    marks: locationsToDraw.map((location) => {
      return Plot.lineY(relevantData, {
        x: "timestamp", y: location, stroke:
          locationColours[location]
      });
    })
  }} />
}

function verticalLineAtDate(
  dateStr: string,
  text: string,
  strokeColour: string = "red"
) {
  return [
    Plot.ruleX([new Date(dateStr)], { stroke: strokeColour, strokeWidth: 2 }),
    Plot.text([{ x: new Date(dateStr), y: 0, text }], {
      x: "x",
      y: "y",
      text: "text",
      dy: -10, // Adjust vertical position
      dx: 5, // Adjust horizontal position
      textAnchor: "start",
      // anchor: "start",  // Adjust the anchor position
      fill: strokeColour, // Set the color of the text
    }),
  ];
}
const histogramPercentageYAxis = (label: string, val: number): Plot.ScaleOptions => {
  return {
    tickFormat: (d: number) => {
      return Math.round(val * 100) + "%";
    },
    ticks: 10,
    label,
    grid: true,
  };
};
export function LocationAverageCountsTable({ locations, graphingData }: { locations: readonly LocationKeys[], graphingData: TrafficGraphingData[] }) {
  const TableRow = ({ location }: { location: LocationKeys }) => {
    const numMeasurements = graphingData.filter((d) => d[location] !== undefined).length;
    const numMeasurementsExcludingFirstAndLast = numMeasurements > 2 ? numMeasurements - 2 : 0;
    const fullDayMeasurements = graphingData
      .filter((d) => d[location] !== undefined)
      .slice(1, -1)

    const avgAcrossFullDays = fullDayMeasurements.reduce((acc, d) => acc + d[location]!, 0) / fullDayMeasurements.length;
    if (fullDayMeasurements.length !== numMeasurementsExcludingFirstAndLast) {
      throw Error('Full day measurements should be equal to numMeasurementsExcludingFirstAndLast');
    }

    return <tr key={location}>
      <td>{location}</td>
      <td>{graphingData.find((d) => d[location] !== undefined)?.timestamp.toLocaleDateString()}</td>
      <td>{graphingData.reverse().find((d) => d[location] !== undefined)?.timestamp.toLocaleDateString()}</td>
      <td>{numMeasurements}</td>
      <td>{numMeasurementsExcludingFirstAndLast}</td>
      <td>{avgAcrossFullDays.toFixed(0)}</td>
    </tr>
  }

  return <>
    <p>Excluding the first and last day of each counter (in case counters were removed before the end
      of a full day).
    </p>
    <table>
      <thead>
        <tr>
          <th>Location name</th>
          <th>Start date</th>
          <th>End date</th>
          <th>Total days</th>
          <th>Total full days</th>
          <th>Average count per full day</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <TableRow location={location}></TableRow>
        ))}
      </tbody>
    </table>
  </>
}