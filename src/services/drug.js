import {GOAxios} from '../../../services/Interceptors';
import {nodeErrHandler} from '../../../utils/utils';

const maxResults = 6;

export default async function fetchDrugs(req, res) {
  const {query} = req.body;
  try {
    const drugResponse = await GOAxios.post('druginformation/v2/searchdrugs', {
      query,
      maxResults,
    });

    const status = drugResponse.status;
    if (status == 200) {
      if (drugResponse && drugResponse.data) {
        return res.status(status).json(drugResponse.data);
      } else {
        return res.status(status).json([]);
      }
    } else {
      return {
        notFound: true,
      };
    }
  } catch (e) {
    nodeErrHandler(res, e);
  }
}
