import MapsChart from "../../components/maps/mapsChart";
import players from "../../assets/players.png";
import quick from "../../assets/quick.png";
import recent from "../../assets/recent.png";
import topProvince from "../../assets/top_province.png";

export default function DashboardPage() {
  const dataMaps = [
    ["id-ac", 19050],
    ["id-su", 48466],
    ["id-sb", 25862],
    ["id-sl", 67061],
    ["id-ri", 55266],
    ["id-kr", 9906],
    ["id-ja", 11174],
    ["id-be", 3638],
    ["id-bb", 2621],
    ["id-1024", 14481],
    ["id-jk", 127904],
    ["id-bt", 65361],
    ["id-jr", 210775],
    ["id-jt", 94373],
    ["id-yo", 23168],
    ["id-ji", 108284],
    ["id-nb", 4192],
    ["id-nt", 3393],
    ["id-kb", 5462],
    ["id-kt", 1976],
    ["id-ks", 6903],
    ["id-ki", 52417],
    ["id-sw", 5725],
    ["id-se", 29912],
    ["id-sr", 711],
    ["id-st", 4327],
    ["id-go", 1149],
    ["id-sg", 3430],
    ["id-ma", 3607],
    ["id-la", 1168],
    ["id-pa", 3911],
    ["id-ba", 5377],
  ];

  return (
    <main className="container-pssi">
      <div className="container mx-auto p-4">
        <div id="map-container" className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-row">
            <div className="bg-gradient-to-r from-[#61D7EF] to-[#92D4F8] rounded-lg shadow p-4 w-60 ml-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-700 text-lg font-bold">Players</span>
                <span className="text-gray-900 font-medium">
                  <img src={players} alt="Top Provinces Icon" className="w-8 h-8" />
                </span>
              </div>
              <div className="text-black text-2xl font-bold">15,678</div>
              <div className="text-gray-500">+4 last month</div>
            </div>
            <div className="bg-gradient-to-r from-[#E2E8F0] to-[#E2E8F0] rounded-lg shadow p-4 w-60 ml-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-700 text-lg font-bold">Coaches</span>
                <span className="text-gray-900 font-medium">
                  <img src={players} alt="Top Provinces Icon" className="w-8 h-8" />
                </span>
              </div>
              <div className="text-black text-2xl font-bold">865</div>
              <div className="text-gray-500">+4 last month</div>
            </div>
            <div className="bg-gradient-to-r from-[#E2E8F0] to-[#E2E8F0] rounded-lg shadow p-4 w-60 ml-3">
              <div className="flex justify-between py-2">
                <span className="text-gray-700 text-lg font-bold">Refrees</span>
                <span className="text-gray-900 font-medium">
                  <img src={players} alt="Top Provinces Icon" className="w-8 h-8" />
                </span>
              </div>
              <div className="text-black text-2xl font-bold">234</div>
              <div className="text-gray-500">+4 last month</div>
            </div>
          </div>
          <MapsChart dataMaps={dataMaps} />
        </div>
        <div className="flex space-x-4 mt-5">
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
    </main>
  );
}
