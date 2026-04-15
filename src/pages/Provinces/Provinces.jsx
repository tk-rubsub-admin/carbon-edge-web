import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { productsContext } from '../../context/Products/Products';
import mockProvinces from "../../data/mockProvinces";
import { withBasePath } from '../../config/runtime';

export default function Provinces() {
  const { data = [], setSearchRes } = useContext(productsContext);
  const navigate = useNavigate();
  
  const grouped = mockProvinces.reduce((acc, province) => {
    if (!acc[province.region]) {
      acc[province.region] = [];
    }
    acc[province.region].push(province);
    return acc;
  }, {});

  const regionOrder = [
    "ภาคตะวันออกเฉียงเหนือ",
    "ภาคกลาง",
    "ภาคเหนือ",
    "ภาคตะวันออก",
    "ภาคตะวันตก",
    "ภาคใต้",
  ];

  const sortedRegions = Object.entries(grouped).sort(
    ([a], [b]) => regionOrder.indexOf(a) - regionOrder.indexOf(b)
  );

  const [openRegions, setOpenRegions] = useState({
    "ภาคตะวันออกเฉียงเหนือ": true,
  });

  const toggleRegion = (region) => {
    setOpenRegions((prev) => ({
      ...prev,
      [region]: !prev[region],
    }));
  };

  function applyFilter(province) {
    let filtered = data;

    if (province) {
      filtered = filtered.filter((p) => p.province === province);
    }

    setSearchRes(filtered);
    navigate('/search');
  }

  return (
    <div className="container">
        <br/> <br/>
      <h3 className="text-3xl font-medium mb-8">Provinces</h3>

      {sortedRegions.map(([region, provinces]) => {
        const isOpen = openRegions[region];

        // ✅ filter หลังจาก group
        const activeProvinces = provinces.filter(
          (p) => p.disabled === false
        );

        // ❗ ถ้า region นี้ไม่มีตัวที่ active เลย → ไม่ต้องแสดงทั้ง section
        if (activeProvinces.length === 0) return null;

        // 👉 sort บึงกาฬขึ้นก่อน
        const sortedProvinces = [...activeProvinces].sort((a, b) => {
          if (a.id === 77) return -1;
          if (b.id === 77) return 1;
          return a.id - b.id;
        });

        return (
          <div key={region} className="mb-6">
            {/* header */}
            <div
              className="flex items-center justify-between cursor-pointer bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
              onClick={() => toggleRegion(region)}
            >
              <h4 className="text-xl font-semibold">
                {region} ({sortedProvinces.length})
              </h4>

              <span
                className={`transform transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </div>

            {/* content */}
            {isOpen && (
              <div className="flex flex-wrap mt-4">
                {sortedProvinces.map((province) => (
                  <div
                    className="w-full lg:w-1/4 md:w-1/3 sm:w-1/2 p-3"
                    key={province.id}
                  >
                    <div className="bg-white transition-shadow hover:shadow-green-300 shadow-md rounded-lg dark:bg-gray-800">
                      
                      <img
                        className="rounded-lg mx-auto"
                        src={withBasePath(`/province/${province.id}.jpg`)}
                        alt={province.nameTh}
                        onClick={() => applyFilter(province.nameTh)}
                        onError={(e) => {
                          e.currentTarget.src = withBasePath('/no-image.jpg');
                        }}
                      />

                      <div className="p-3 text-center">
                        <h4 className="font-semibold">{province.nameTh}</h4>
                        <p className="text-sm text-gray-500">
                          {province.nameEn}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
