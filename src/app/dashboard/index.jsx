import MapsChart from '../../components/maps/mapsChart';
import quick from '../../assets/quick.png';
import recent from '../../assets/recent.png';
import topProvince from '../../assets/top_province.png';
import { useEffect, useState } from 'react';
import sessions from '../../../utils/sessions';
import apiService from '../../../utils/services';
import NavBar from '../../components/navbar';
import { mapping } from '../../helper/transformProvinceArray';

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
      const players = await apiService.get(`/api/player/GetListData?row_from=${rowFrom}&length=${rowLength}`, headers);

      if (players.status === 200) {
        setplayer(players.data.recordsTotal.toLocaleString('id-ID'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCountCoach = async () => {
    try {
      const coach = await apiService.get(`/api/coach/GetListData?row_from=${rowFrom}&length=${rowLength}`, headers);

      if (coach.status === 200) {
        setcoach(coach.data.recordsTotal.toLocaleString('id-ID'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCountReferee = async () => {
    try {
      const referee = await apiService.get(`/api/referee/GetListData?row_from=${rowFrom}&length=${rowLength}`, headers);

      if (referee.status === 200) {
        setreferee(referee.data.recordsTotal.toLocaleString('id-ID'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProvincePlayer = async () => {
    try {
      const response = await apiService.get(`/api/player/GetDataByProvinsi`, headers);

      const mapArray = Object.keys(response.data).map((key) => response.data[key]);

      const mappingArray = mapping(mapArray);

      setDataMaps(mappingArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinceCoaches = async () => {
    try {
      const response = await apiService.get(`/api/player/GetDataByProvinsi`, headers);

      const mapArray = Object.keys(response.data).map((key) => response.data[key]);

      const mappingArray = mapping(mapArray);

      setDataMaps(mappingArray);
    } catch (error) {
      console.log(error);
    }
  };

  const getProvinceReferee = async () => {
    try {
      const response = await apiService.get(`/api/player/GetDataByProvinsi`, headers);

      const mapArray = Object.keys(response.data).map((key) => response.data[key]);

      const mappingArray = mapping(mapArray);

      setDataMaps(mappingArray);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountPlayer();
    getCountCoach();
    getCountReferee();
    if (activeCard === 'players') getProvincePlayer();
    if (activeCard === 'coaches') getProvinceCoaches();
    if (activeCard === 'referees') getProvinceReferee();
  }, [rowFrom, rowLength]);

  const [activeCard, setActiveCard] = useState('players');

  return (
    <div>
      <div className="bg-[#7E0000] absolute h-[60vh] w-full z-10"></div>
      <NavBar bgColor="#FFFFFF" selectedTextColor="#7E0000" secondaryTextColor="#6C6C6C" />

      <div className="container-pssi mx-4 z-20 relative">
        <div className="container mx-auto p-4">
          <div id="map-container" className="bg-white rounded-lg shadow p-4">
            <div className="flex flex-row pt-3">
              <div
                key={'players'}
                onClick={() => setActiveCard('players')}
                style={{ cursor: 'pointer' }}
                className={`${
                  activeCard === 'players' ? 'bg-[#7E0000] text-white' : 'bg-slate-200 text-slate-700'
                } rounded-lg shadow p-4 w-60 ml-3 relative`}
              >
                <small className="text-xs font-normal">Total Players.</small>
                <div className=" text-xl font-bold">{player} </div>
                {activeCard === 'players' ? (
                  <img src="./bg-logo-red.svg" className="w-20 h-20 absolute bottom-[-15px] right-[-5px]" />
                ) : (
                  <img src="./bg-logo-grey.svg" className="w-20 h-20 absolute bottom-[-15px] right-[-5px]" />
                )}
              </div>

              <div
                key={'coaches'}
                onClick={() => setActiveCard('coaches')}
                style={{ cursor: 'pointer' }}
                className={`${
                  activeCard === 'coaches' ? 'bg-[#7E0000] text-white' : 'bg-slate-200 text-slate-700'
                } rounded-lg shadow p-4 w-60 ml-3 relative`}
              >
                <small className="text-xs font-normal">Total Coaches</small>
                <div className=" text-xl font-bold">{coach} </div>

                {activeCard === 'coaches' ? (
                  <img src="./bg-logo-red.svg" className="w-20 h-20 absolute bottom-[-15px] right-[-5px]" />
                ) : (
                  <img src="./bg-logo-grey.svg" className="w-20 h-20 absolute bottom-[-15px] right-[-5px]" />
                )}
              </div>

              <div
                key={'referees'}
                onClick={() => setActiveCard('referees')}
                style={{ cursor: 'pointer' }}
                className={`${
                  activeCard === 'referees' ? 'bg-[#7E0000] text-white' : 'bg-slate-200 text-slate-700'
                } rounded-lg shadow p-4 w-60 ml-3 relative`}
              >
                <small className="text-xs font-normal">Total Referees</small>
                <div className=" text-xl font-bold">{referee} </div>

                {activeCard === 'referees' ? (
                  <img src="./bg-logo-red.svg" className="w-20 h-20 absolute bottom-[-15px] right-[-5px]" />
                ) : (
                  <img src="./bg-logo-grey.svg" className="w-20 h-20 absolute bottom-[-15px] right-[-5px]" />
                )}
              </div>
            </div>
            <MapsChart dataMaps={dataMaps} />
          </div>
        </div>

        <div className="flex px-4 space-x-5 mt-4">
          <div className="bg-white rounded-lg shadow p-6 w-1/2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={topProvince} alt="Top Provinces Icon" className="w-5 h-5" />
              <div className="text-black font-semibold text-lg">Top Provinces</div>
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
              <div className="text-black font-semibold text-lg">Recent Updates</div>
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
              <div className="text-black font-semibold text-lg">Quick Stats</div>
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
      </div>
    </div>
  );
}
