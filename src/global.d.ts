interface NavigatorLanguage {
  userLanguage?: string;
  browserLanguage?: string;
}

interface DiseasesData {
  date: string,
  cases: BigInt,
  deaths: BigInt,
  updated: BigInt
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
  cases: Record<string, BigInt>,
  deaths: Record<string, BigInt>
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
    confirmed: BigInt,
    deaths: BigInt,
    recovered: BigInt
  },
  coordinates: DiseasesCoords
}

interface JHUVaccineData {
  country: string,
  timeline: Record<string, BigInt>
}