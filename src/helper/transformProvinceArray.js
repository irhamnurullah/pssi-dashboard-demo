import { getIdmaps } from './getIdMaps';

export const mapping = (daraArray) => {
  const mapArray = daraArray.map((item) => {
    const id = getIdmaps(item.ID_PROVINSI);
    const total = item.PRIA_ALL.TOTAL + item.WANITA_ALL.TOTAL;
    return [id, total];
  });

  return mapArray;
};

export const mappingReferee = (daraArray) => {
  const mapArray = daraArray.map((item) => {
    const id = getIdmaps(item.ID_PROVINSI);
    const total = item.TOTAL_PRIA + item.TOTAL_WANITA;
    return [id, total];
  });

  return mapArray;
};
