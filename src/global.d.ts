declare const importantDates: string[];

interface NavigatorLanguage {
  userLanguage?: string;
  browserLanguage?: string;
}

interface DiseasesData {
  date: string,
  cases: number,
  deaths: number,
  updated: number
}

interface NYTStateData extends DiseasesData {
  state: string,
  fips: string,
}
interface NYTCountryData extends NYTStateData {
  county: string
}
interface NYTCountryData extends DiseasesData {
}

interface DiseasesTimeline {
  cases: Record<string, number>,
  deaths: Record<string, number>
}
interface DiseasesCoords {
  latitude: string,
  longitude: string
}

interface JHUCountryByCountyData {
  country: string,
  province: string,
  county: string,
  updatedAt: string,
  stats: {
    confirmed: number,
    deaths: number,
    recovered: number
  },
  coordinates: DiseasesCoords
}

interface JHUVaccineData {
  country: string,
  timeline: Record<string, number>
}

interface ChartableData {
  x: Date,
  y: number
}

interface DataSet {
  name: string,
  color: string,
  data: ChartableData[]
}