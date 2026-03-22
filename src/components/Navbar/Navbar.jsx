import logo from '../../assets/logo-carbon-edge.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/Auth/Auth';
import { initFlowbite } from 'flowbite';
import { productsContext } from '../../context/Products/Products';

export default function Navbar() {
  const { userToken } = useContext(authContext);
  const location = useLocation();
  const navigate = useNavigate();

  const { data = [], setSearchRes } = useContext(productsContext);

  const [category, setCategory] = useState('');
  const [province, setProvince] = useState('');

  function handleSearch(e) {
    if (e.key === 'Enter') {
      const query = e.target.value.toLowerCase().trim();

      const filteredProducts = data.filter((product) =>
        product.nameTh?.toLowerCase().includes(query) ||
        product.nameEn?.toLowerCase().includes(query)
      );

      setSearchRes(filteredProducts);
      navigate('/search');
    }
  }

  function applyFilter() {
    let filtered = data;

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (province) {
      filtered = filtered.filter((p) => p.province === province);
    }

    setSearchRes(filtered);
    navigate('/search');
  }

  useEffect(() => {
    initFlowbite();
  }, []);

  const getLinkClass = (path) => {
    return location.pathname === path
      ? 'block py-2 px-3 text-white bg-green-700 rounded lg:bg-transparent lg:text-green-700 lg:p-0'
      : 'block py-2 px-3 text-gray-900 rounded hover:text-green-700 lg:p-0';
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-14" alt="Logo" />
        </Link>

        {/* CENTER SECTION */}
        {userToken && (
          <div className="hidden lg:flex flex-col items-center absolute left-1/2 transform -translate-x-1/2">
            {/* LABEL */}
            <div className="mb-3 text-center whitespace-nowrap">
              <h1 className="text-2xl font-extrabold tracking-[0.12em] uppercase bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 bg-clip-text text-transparent drop-shadow-sm">
                Green Business Matching Platform
              </h1>
              <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mt-2"></div>
            </div>

            {/* MENU */}
            <ul className="flex flex-row space-x-8 font-medium">
              <li>
                <Link to="/" className={getLinkClass('/')}>
                  Home
                </Link>
              </li>

              <li>
                <Link to="/provinces" className={getLinkClass('/provinces')}>
                  Provinces
                </Link>
              </li>

              <li>
                <Link to="/categories" className={getLinkClass('/categories')}>
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="flex lg:order-2 items-center gap-2">
          {userToken && (
            <div className="hidden lg:flex flex-col">
              {/* SEARCH */}
              <input
                type="text"
                onKeyUp={handleSearch}
                className="p-2 border rounded mb-2"
                placeholder="Search..."
              />

              {/* FILTER */}
              <div className="flex gap-2">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">Category</option>
                  <option value="ผ้า">ผ้า</option>
                  <option value="อาหาร">อาหาร</option>
                  <option value="งานคราฟต์">งานคราฟต์</option>
                </select>

                <select
                  onChange={(e) => setProvince(e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="">จังหวัด</option>
                  <option value="บึงกาฬ">บึงกาฬ</option>
                </select>

                <button
                  onClick={applyFilter}
                  className="bg-green-600 text-white px-3 rounded"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}