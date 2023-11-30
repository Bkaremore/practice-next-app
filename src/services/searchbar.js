import _ from 'lodash';
import {GOAxios} from './Interceptors';

const sanitizeQuery = query => {
  return query.replace(/[^a-zA-Z0-9 ,_-]/g, '').trim();
};

export const searchDrugs = async drugName => {
  const maxResults = 6;
  try {
    const drugResponse = await GOAxios.post('/druginformation/v2/searchdrugs', {
      query: sanitizeQuery(drugName),
      maxResults,
    });
    const status = drugResponse.status;
    if (status == 200) {
      return drugResponse.data?.results;
    }
  } catch (err) {
    console.error(err);
  }
};

export const fetchPopularDrugs = async () => {
  try {
    const drugResponse = await GOAxios.get(
      '/druginformation/v2/GetTopPrescription',
    );
    const status = drugResponse.status;
    if (status == 200) {
      if (drugResponse && drugResponse.data) {
        let data = drugResponse.data?.results;
        data = data.length > 5 ? data.slice(0, 5) : data;
        return data;
      } else {
        return [];
      }
    }
  } catch (err) {
    console.error(err);
  }
};
