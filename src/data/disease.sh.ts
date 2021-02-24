import Axios from './axios';

const axios = Axios('https://disease.sh/v3/covid-19/');

// NYT
export const nytHistoryByState = async (state: string) => {
  let data = [] as NYTStateData[];
  try {
    const response = await axios(`nyt/states/${encodeURIComponent(state)}?lastdays=all`);
    data = response.data as NYTStateData[];
  } catch (err) {
    console.log({ err })
  } finally {
    return data;
  }
};
export const nytHistoryUS = async () => {
  let data = [] as NYTCountryData[];
  try {
    const response = await axios(`nyt/usa`);
    data = response.data as NYTCountryData[];
  } catch (err) {
    console.log({ err })
  } finally {
    return data;
  }
};

// JHUCSSE
export const jhuCurrentUSByCounty = async () => {
  let data = [] as JHUCountryByCountyData[];
  try {
    const response = await axios(`jhucsse/counties`);
    data = response.data as JHUCountryByCountyData[];
  } catch (err) {
    console.log({ err })
  } finally {
    return data;
  }
};

// Vaccines
export const vaccines = async (country: string = 'usa') => {
  let data = [] as JHUVaccineData[];
  try {
    const response = await axios(`vaccine/coverage/countries/${country}?lastdays=all`);
    data = response.data as JHUVaccineData[];
  } catch (err) {
    console.log({ err })
  } finally {
    return data;
  }
}
