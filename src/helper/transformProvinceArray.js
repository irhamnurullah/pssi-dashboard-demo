import { getIdmaps } from './getIdMaps';

export const mapping = (daraArray) => {
  const mapArray = daraArray.map((item) => {
    const id = getIdmaps(item.ID_PROVINSI);
    const total = item.PRIA_ALL.TOTAL + item.WANITA_ALL.TOTAL;
    return [id, total];
  });

  return mapArray;
};

export const mappingReferee = (dataArray, dataKey) => {
  const mapArray = dataArray.map((item) => {
    const id = getIdmaps(item.ID_PROVINSI);
    // Tentukan total berdasarkan dataKey
    const total = dataKey === 'male_referee' ? item.TOTAL_PRIA : item.TOTAL_WANITA;
    return [id, total];
  });

  return mapArray;
};

export const mappingCoach = (dataArray, dataKey) => {
  const mapArray = dataArray.map((item) => {
    const id = getIdmaps(item.ID_PROVINSI);
    // Tentukan total berdasarkan dataKey
    const total = dataKey === 'male_coaches' ? item.TOTAL_PRIA : item.TOTAL_WANITA;
    return [id, total];
  });

  return mapArray;
};

export const mappingPlayer = (dataArray, dataKey) => {
  const mapArray = dataArray.map((item) => {
    const id = getIdmaps(item.ID_PROVINSI);
    // Tentukan total berdasarkan dataKey
    const total = dataKey === 'male_player' ? item.TOTAL_PRIA : item.TOTAL_WANITA;
    return [id, total];
  });

  return mapArray;
};

export const mappingCompetition = (dataArray, dataFilter) => {
  const mapArray = dataArray.map((item) => {
    const id = getIdmaps(item.ID_PROVINSI);
    // Tentukan total berdasarkan dataKey
    const total = item[dataFilter];
    return [id, total];
  });

  return mapArray;
};
