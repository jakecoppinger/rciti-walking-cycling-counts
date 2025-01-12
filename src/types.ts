interface Coord {
  lat: number;
  lon: number;
};
/**
 * Coordinates imported from https://www.eco-visio.net/v5//manager/#::view=list&site=300040105
 */
export const counterLocationCoordinates: Record<LocationKeys, Coord> = {
  // '53 Perouse Rd': {lat: -33.92063737023946, lon: 151.24289340397812},
  'Addiscombe Rd': {lat: -33.78730580747516, lon: 151.27460385148882},
  'Auburn Rd & Mary St': {lat: -33.85199149135999, lon: 151.03270895720928},
  'Auburn Rd eastern footpath': {lat: -33.85284228197173, lon: 151.03264606150333},
  'Belmore Rd': {lat: -33.914726563403995, lon: 151.24013990163806},
  'Bourke Street & Lachlan Street': {lat: -33.90013, lon: 151.21035},
  // 'Civic Park, Pendle Hill': {lat: -33.80051267777879, lon: 150.95425664330833},
  'Coles St': {lat: -33.86500199390324, lon: 151.09832559621285},
  'Collins Street': {lat: -33.91188, lon: 151.19842},
  'Concord Rd East footpath': {lat: -33.857308016489704, lon: 151.09197794120476},
  'Concord Rd West footpath': {lat: -33.85726742505202, lon: 151.09179324936122},
  'Correys Ave': {lat: -33.85512197722634, lon: 151.0931954055559},
  'Doncaster Ave North of Todman Ave': {lat: -33.90902, lon: 151.22546},
  'Evaline St North side': {lat: -33.91364, lon: 151.10241},
  'Evaline St South side': {lat: -33.91352625685791, lon: 151.10307706170718},
  'Houston Rd and Day Ave': {lat: -33.91783238582725, lon: 151.22495631454515},
  'Kenneth Rd': {lat: -33.78862294811363, lon: 151.278372569941},
  // 'Lidcombe town centre': {lat: -33.86437856227838, lon: 151.04377584066245},
  'Oliver St & Brighton St (East)': {lat: -33.770257, lon: 151.285187},
  'Oliver St & Brighton St (West)': {lat: -33.77043, lon: 151.28497},
  'Oliver Street (east footpath)': {lat: -33.77453188716859, lon: 151.28437679959464},
  'Oliver Street (west footpath)': {lat: -33.77439513631387,lon: 151.28425845759924},
  'Parramatta Rd footpath': {lat: -33.86809946028913, lon: 151.0995857632952},
  'Perouse Rd footpath': {lat: -33.92007304647842, lon: 151.242752703256},
  'Rainbow street': {lat: -33.92493, lon: 151.23466},
  'St Pauls Street footpath': {lat: -33.92034, lon: 151.24388},
};

export const locations = [
  'Addiscombe Rd',
  'Auburn Rd & Mary St',
  'Auburn Rd eastern footpath',
  'Belmore Rd',
  'Bourke Street & Lachlan Street',
  'Coles St',
  'Collins Street',
  'Concord Rd East footpath',
  'Concord Rd West footpath',
  'Correys Ave',
  'Doncaster Ave North of Todman Ave',
  'Evaline St North side',
  'Evaline St South side',
  'Houston Rd and Day Ave',
  'Kenneth Rd',
  'Oliver St & Brighton St (East)',
  'Oliver St & Brighton St (West)',
  'Oliver Street (east footpath)',
  'Oliver Street (west footpath)',
  'Parramatta Rd footpath',
  'Perouse Rd footpath',
  'Rainbow street',
  'St Pauls Street footpath',
] as const;

/**
 * A unique colour for each location. Can be anything, but MUST be unique.
 */
  export const locationColours: Record<LocationKeys, string> = {
    'Addiscombe Rd': 'red',
    'Auburn Rd & Mary St': 'blue',
    'Auburn Rd eastern footpath': 'green',
    'Belmore Rd': 'yellow',
    'Bourke Street & Lachlan Street': 'orange',
    'Coles St': 'purple',
    'Collins Street': 'teal',
    'Concord Rd East footpath': 'pink',
    'Concord Rd West footpath': 'brown',
    'Correys Ave': 'lime',
    'Doncaster Ave North of Todman Ave': 'gold',
    'Evaline St North side': 'silver',
    'Evaline St South side': 'magenta',
    'Houston Rd and Day Ave': 'cyan',
    'Kenneth Rd': 'navy',
    'Oliver St & Brighton St (East)': 'maroon',
    'Oliver St & Brighton St (West)': 'olive',
    'Oliver Street (east footpath)': 'turquoise',
    'Oliver Street (west footpath)': 'salmon',
    'Parramatta Rd footpath': 'lavender',
    'Perouse Rd footpath': 'indigo',
    'Rainbow street': 'peach',
    'St Pauls Street footpath': 'plum'
  };

export type LocationKeys = (typeof locations)[number];

export interface TrafficData {
  /** Time like "2024-03-07 00:00:00", (not ISO8601) */
  timestamp: string;
  'Addiscombe Rd': number | undefined,
  'Auburn Rd & Mary St': number | undefined,
  'Auburn Rd eastern footpath': number | undefined,
  'Belmore Rd': number | undefined,
  'Bourke Street & Lachlan Street': number | undefined,
  'Coles St': number | undefined,
  'Collins Street': number | undefined,
  'Concord Rd East footpath': number | undefined,
  'Concord Rd West footpath': number | undefined,
  'Correys Ave': number | undefined,
  'Doncaster Ave North of Todman Ave': number | undefined,
  'Evaline St North side': number | undefined,
  'Evaline St South side': number | undefined,
  'Houston Rd and Day Ave': number | undefined,
  'Kenneth Rd': number | undefined,
  'Oliver St & Brighton St (East)': number | undefined,
  'Oliver St & Brighton St (West)': number | undefined,
  'Oliver Street (east footpath)': number | undefined,
  'Oliver Street (west footpath)': number | undefined,
  'Parramatta Rd footpath': number | undefined,
  'Perouse Rd footpath': number | undefined,
  'Rainbow street': number | undefined,
  'St Pauls Street footpath': number | undefined;
}

export interface TrafficGraphingData {
  /** Time like "2024-03-07 00:00:00", (not ISO8601) */
  timestamp: Date;
  'Addiscombe Rd': number | undefined,
  'Auburn Rd & Mary St': number | undefined,
  'Auburn Rd eastern footpath': number | undefined,
  'Belmore Rd': number | undefined,
  'Bourke Street & Lachlan Street': number | undefined,
  'Coles St': number | undefined,
  'Collins Street': number | undefined,
  'Concord Rd East footpath': number | undefined,
  'Concord Rd West footpath': number | undefined,
  'Correys Ave': number | undefined,
  'Doncaster Ave North of Todman Ave': number | undefined,
  'Evaline St North side': number | undefined,
  'Evaline St South side': number | undefined,
  'Houston Rd and Day Ave': number | undefined,
  'Kenneth Rd': number | undefined,
  'Oliver St & Brighton St (East)': number | undefined,
  'Oliver St & Brighton St (West)': number | undefined,
  'Oliver Street (east footpath)': number | undefined,
  'Oliver Street (west footpath)': number | undefined,
  'Parramatta Rd footpath': number | undefined,
  'Perouse Rd footpath': number | undefined,
  'Rainbow street': number | undefined,
  'St Pauls Street footpath': number | undefined;
}

export interface TrafficDataRaw {
  [key: string]: string | undefined;
}

export function isStringALocationKey(key: string): key is LocationKeys {
  return locations.includes(key as LocationKeys);
}
