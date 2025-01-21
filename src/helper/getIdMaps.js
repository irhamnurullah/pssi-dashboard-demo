export const getIdmaps = (provinsi) => {
  switch (provinsi) {
    case 1:
      return 'id-ba';
    case 2:
      return 'id-bt';
    case 3:
      return 'id-be';
    case 4:
      return 'id-yo';
    case 5:
      return 'id-jk';
    case 6:
      return 'id-go';
    case 7:
      return 'id-ja';
    case 8:
      return 'id-jr';
    case 9:
      return 'id-jt';
    case 10:
      return 'id-ji';
    case 11:
      return 'id-kb';
    case 12:
      return 'id-ks';
    case 13:
      return 'id-kt';
    case 14:
      return 'id-ki';
    case 15:
      return 'id-1024';
    case 16:
      return 'id-ma';
    case 17:
      return 'id-la';
    case 18:
      return 'id-ac';
    case 19:
      return 'id-nb';
    case 20:
      return 'id-nt';
    case 21:
      return 'id-pa';
    case 22:
      return 'id-ri';
    case 23:
      return 'id-se';
    case 24:
      return 'id-st';
    case 25:
      return 'id-sg';
    case 26:
      return 'id-sw';
    case 27:
      return 'id-sb';
    case 28:
      return 'id-sl';
    case 29:
      return 'id-sw';
    case 30:
      return 'id-ib';
    case 31:
      return 'id-sr';
    case 32:
      return 'id-bb';
    case 33:
      return 'id-kr';
    case 35:
      return 'id-ku';
    case 37:
      return 'id-bi'; // PAPUA TENGAH
    case 38:
      return 'id-bi'; // PAPUA SELATAN
    case 39:
      return 'id-bi'; // PAPUA PEGUNUNGAN
    case 40:
      return 'id-bi'; // PAPUA BARAT DAYA
    default:
      return 'Unknown Province';
  }
};
