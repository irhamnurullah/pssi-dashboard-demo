import MapsChart from "../../components/maps/mapsChart";
import players from "../../assets/players.png";
import quick from "../../assets/quick.png";
import recent from "../../assets/recent.png";
import topProvince from "../../assets/top_province.png";
import { useEffect, useState } from "react";
import sessions from "../../../utils/sessions";
import apiService from "../../../utils/services";
import NavBar from '../../components/navbar';
import Footer from "../../components/footer";

export default function DashboardPage() {
  const token = sessions.getSessionToken();
  const [rowFrom, setRowFrom] = useState(0);
  const [rowLength, setRowLength] = useState(10);
  const [player, setplayer] = useState(0);
  const [coach, setcoach] = useState(0);
  const [referee, setreferee] = useState(0);
  const [dataMaps, setDataMaps] = useState([]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const getCountPlayer = async () => {
    try {
      const players = await apiService.get(
        `/api/player/GetListData?row_from=${rowFrom}&length=${rowLength}`,
        headers
      );

      if (players.status === 200) {
        setplayer(players.data.recordsTotal.toLocaleString("id-ID"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCountCoach = async () => {
    try {
      const coach = await apiService.get(
        `/api/coach/GetListData?row_from=${rowFrom}&length=${rowLength}`,
        headers
      );

      if (coach.status === 200) {
        setcoach(coach.data.recordsTotal.toLocaleString("id-ID"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCountReferee = async () => {
    try {
      const referee = await apiService.get(
        `/api/referee/GetListData?row_from=${rowFrom}&length=${rowLength}`,
        headers
      );

      if (referee.status === 200) {
        setreferee(referee.data.recordsTotal.toLocaleString("id-ID"));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProvincePlayer = async () => {
    try {
      const response = await apiService.get(
        `/api/player/GetDataByProvinsi`,
        headers
      );

      const mapArray = Object.keys(response.data).map(
        (key) => response.data[key]
      );

      const mapping = mapArray.map((item) => {
        const id = getIdmaps(item.ID_PROVINSI);
        const total = item.PRIA_ALL.TOTAL + item.WANITA_ALL.TOTAL;
        return [id, total];
      });

      setDataMaps(mapping);
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinceCoaches = async () => {
    try {
      const response = await apiService.get(
        `/api/player/GetDataByProvinsi`,
        headers
      );

      const mapArray = Object.keys(response.data).map(
        (key) => response.data[key]
      );

      const mapping = mapArray.map((item) => {
        const id = getIdmaps(item.ID_PROVINSI);
        const total = item.PRIA_ALL.TOTAL + item.WANITA_ALL.TOTAL;
        return [id, total];
      });

      setDataMaps(mapping);
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinceReferee = async () => {
    try {
      const response = await apiService.get(
        `/api/player/GetDataByProvinsi`,
        headers
      );

      const mapArray = Object.keys(response.data).map(
        (key) => response.data[key]
      );

      const mapping = mapArray.map((item) => {
        const id = getIdmaps(item.ID_PROVINSI);
        const total = item.PRIA_ALL.TOTAL + item.WANITA_ALL.TOTAL;
        return [id, total];
      });

      setDataMaps(mapping);
    } catch (error) {
      console.log(error);
    }
  };

  const getIdmaps = (provinsi) => {
    switch (provinsi) {
      case 1:
        return "id-ba";
      case 2:
        return "id-bt";
      case 3:
        return "id-be";
      case 4:
        return "id-yo";
      case 5:
        return "id-jk";
      case 6:
        return "id-go";
      case 7:
        return "id-ja";
      case 8:
        return "id-jr";
      case 9:
        return "id-jt";
      case 10:
        return "id-ji";
      case 11:
        return "id-kb";
      case 12:
        return "id-ks";
      case 13:
        return "id-kt";
      case 14:
        return "id-ki";
      case 15:
        return "id-1024";
      case 16:
        return "id-ma";
      case 17:
        return "id-la";
      case 18:
        return "id-ac";
      case 19:
        return "id-nb";
      case 20:
        return "id-nt";
      case 21:
        return "id-pa";
      case 22:
        return "id-ri";
      case 23:
        return "id-se";
      case 24:
        return "id-st";
      case 25:
        return "id-sg";
      case 26:
        return "id-sw";
      case 27:
        return "id-sb";
      case 28:
        return "id-sl";
      case 29:
        return "id-sw";
      case 30:
        return "id-ib";
      case 31:
        return "id-sr";
      case 32:
        return "id-bb";
      case 33:
        return "id-kr";
      case 35:
        return "id-ku";
      case 37:
        return "id-bi"; // PAPUA TENGAH
      case 38:
        return "id-bi"; // PAPUA SELATAN
      case 39:
        return "id-bi"; // PAPUA PEGUNUNGAN
      case 40:
        return "id-bi"; // PAPUA BARAT DAYA
      default:
        return "Unknown Province";
    }
  };

  useEffect(() => {
    getCountPlayer();
    getCountCoach();
    getCountReferee();
    if (activeCard === "players") getProvincePlayer();
    if (activeCard === "coaches") getProvinceCoaches();
    if (activeCard === "referees") getProvinceReferee();
    
  }, [rowFrom, rowLength]);

  // const dataMaps = [
  //   ["id-ac", 19050],
  //   ["id-su", 48466],
  //   ["id-sb", 25862],
  //   ["id-sl", 67061],
  //   ["id-ri", 55266],
  //   ["id-kr", 9906],
  //   ["id-ja", 11174],
  //   ["id-be", 3638],
  //   ["id-bb", 2621],
  //   ["id-1024", 14481],
  //   ["id-jk", 127904],
  //   ["id-bt", 65361],
  //   ["id-jr", 210775],
  //   ["id-jt", 94373],
  //   ["id-yo", 23168],
  //   ["id-ji", 108284],
  //   ["id-nb", 4192],
  //   ["id-nt", 3393],
  //   ["id-kb", 5462],
  //   ["id-kt", 1976],
  //   ["id-ks", 6903],
  //   ["id-ki", 52417],
  //   ["id-sw", 5725],
  //   ["id-se", 29912],
  //   ["id-sr", 711],
  //   ["id-st", 4327],
  //   ["id-go", 1149],
  //   ["id-sg", 3430],
  //   ["id-ma", 3607],
  //   ["id-la", 1168],
  //   ["id-pa", 3911],
  //   ["id-ba", 5377],
  // ];

  const [activeCard, setActiveCard] = useState("players");

  return (
    <>
      <NavBar  bgColor="#7E0000" selectedTextColor="#FFFFFF" secondaryTextColor="#C6C6C6" />
      <main className="container-pssi">
        <div className="container mx-auto p-4">
          <div id="map-container" className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-row">
              <div
                key={"players"}
                onClick={() => setActiveCard("players")}
                style={{ cursor: "pointer" }}
                className={`${
                  activeCard === "players"
                    ? "bg-gradient-to-r from-[#92D4F8] from-10% via-[#92D4F8] via-30% via-[#006FFF] via-50% via-[#16A34A] via-70% to-[#81F6E8] to-90%"
                    : "bg-gradient-to-r from-[#E2E8F0] to-[#E2E8F0]"
                } rounded-lg shadow p-4 w-60 ml-3`}
              >
                <div className="flex justify-between py-2">
                  <span className="text-gray-700 text-lg font-bold">Players</span>
                  <span className="text-gray-900 font-medium">
                    <img
                      src={players}
                      alt="Top Provinces Icon"
                      className="w-8 h-8"
                    />
                  </span>
                </div>
                <div className="text-black text-2xl font-bold">{player}</div>
                <div className="text-gray-500">+4 last month</div>
              </div>
              <div
                key={"coaches"}
                onClick={() => setActiveCard("coaches")}
                style={{ cursor: "pointer" }}
                className={`${
                  activeCard === "coaches"
                    ? "bg-gradient-to-r from-[#92D4F8] from-10% via-[#92D4F8] via-30% via-[#006FFF] via-50% via-[#16A34A] via-70% to-[#81F6E8] to-90%"
                    : "bg-gradient-to-r from-[#E2E8F0] to-[#E2E8F0]"
                } rounded-lg shadow p-4 w-60 ml-3`}
              >
                <div className="flex justify-between py-2">
                  <span className="text-gray-700 text-lg font-bold">Coaches</span>
                  <span className="text-gray-900 font-medium">
                    <img
                      src={players}
                      alt="Top Provinces Icon"
                      className="w-8 h-8"
                    />
                  </span>
                </div>
                <div className="text-black text-2xl font-bold">{coach}</div>
                <div className="text-gray-500">+4 last month</div>
              </div>
              <div
                key={"referees"}
                onClick={() => setActiveCard("referees")}
                style={{ cursor: "pointer" }}
                className={`${
                  activeCard === "referees"
                    ? "bg-gradient-to-r from-[#92D4F8] from-10% via-[#92D4F8] via-30% via-[#006FFF] via-50% via-[#16A34A] via-70% to-[#81F6E8] to-90%"
                    : "bg-gradient-to-r from-[#E2E8F0] to-[#E2E8F0]"
                } rounded-lg shadow p-4 w-60 ml-3`}
              >
                <div className="flex justify-between py-2">
                  <span className="text-gray-700 text-lg font-bold">
                    Referees
                  </span>
                  <span className="text-gray-900 font-medium">
                    <img
                      src={players}
                      alt="Top Provinces Icon"
                      className="w-8 h-8"
                    />
                  </span>
                </div>
                <div className="text-black text-2xl font-bold">{referee}</div>
                <div className="text-gray-500">+4 last month</div>
              </div>
            </div>
            <MapsChart dataMaps={dataMaps} />
          </div>
          
        </div>
      </main>

      <main className="container-pssi bg-[#7E0000]">
        <div className="flex space-x-4 mt-5">
            <div className="bg-white rounded-lg shadow p-6 w-1/2">
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src={topProvince}
                  alt="Top Provinces Icon"
                  className="w-5 h-5"
                />
                <div className="text-black font-semibold text-lg">
                  Top Provinces
                </div>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Jakarta</span>
                <span className="text-gray-900 font-medium">1000+</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">West Java</span>
                <span className="text-gray-900 font-medium">800+</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">East Java</span>
                <span className="text-gray-900 font-medium">600+</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 w-1/2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={recent} alt="Top Provinces Icon" className="w-5 h-5" />
                <div className="text-black font-semibold text-lg">
                  Recent Updates
                </div>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">New Player Registration</span>
                <span className="text-gray-900 font-medium">2024-03-15</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Coach License Update</span>
                <span className="text-gray-900 font-medium">2024-03-14</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Referee Assignment</span>
                <span className="text-gray-900 font-medium">2024-03-13</span>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 w-1/2">
              <div className="flex items-center space-x-2 mb-4">
                <img src={quick} alt="Top Provinces Icon" className="w-5 h-5" />
                <div className="text-black font-semibold text-lg">
                  Quick Stats
                </div>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Active Competitions</span>
                <span className="text-gray-900 font-medium">24</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Total Mathces</span>
                <span className="text-gray-900 font-medium">1,234</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-700">Training Centers</span>
                <span className="text-gray-900 font-medium">45</span>
              </div>
            </div>
          </div>
      </main>
    </>
  );
}
