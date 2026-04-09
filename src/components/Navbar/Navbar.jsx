import logo from '../../assets/logo-carbon-edge.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { initFlowbite } from 'flowbite';
import { productsContext } from '../../context/Products/Products';
import { useTranslation } from 'react-i18next';
import { authContext } from '../../context/Auth/Auth';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const { data = [], setSearchRes } = useContext(productsContext);
  const { userToken, userDisplayName, setUserToken, setUserDisplayName } =
    useContext(authContext);

  const [category, setCategory] = useState('');
  const [province, setProvince] = useState('');
  const [language, setLanguage] = useState(i18n.language || 'th');

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

  function handleLanguageChange(e) {
    const nextLanguage = e.target.value;
    setLanguage(nextLanguage);
    i18n.changeLanguage(nextLanguage);
    localStorage.setItem('appLanguage', nextLanguage);
  }

  function handleLogout() {
    setUserToken(null);
    setUserDisplayName('');
    setSearchRes(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDisplayName');
    navigate('/');
  }

  const hideSearchBar = [
    '/login',
    '/seller-login',
    '/register',
    '/forgotPassword',
  ].includes(location.pathname);

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        {/* LOGO */}
        <div className="flex flex-col gap-4 lg:gap-5">
          <div className="flex items-start justify-between gap-4">
            <Link to="/" className="flex items-center shrink-0">
              <img src={logo} className="h-14" alt="Logo" />
            </Link>

            <div className="flex flex-wrap items-stretch justify-end gap-3 text-sm font-medium text-gray-700">
              <label className="flex min-h-[76px] flex-col justify-between rounded-2xl border border-gray-200 bg-white px-4 py-2 text-right">
                <span className="flex items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M3 12h18"></path>
                    <path d="M12 3a15 15 0 0 1 0 18"></path>
                    <path d="M12 3a15 15 0 0 0 0 18"></path>
                  </svg>
                  {t('language.label')}
                </span>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  className="mt-1 border-0 bg-transparent p-0 text-right text-sm font-medium text-gray-700 focus:ring-0"
                  aria-label="Language"
                >
                  <option value="th">{t('language.th')}</option>
                  <option value="en">{t('language.en')}</option>
                </select>
              </label>

              {userToken ? (
                <div className="flex min-h-[76px] flex-col justify-between rounded-2xl border border-green-100 bg-green-50/70 px-4 py-2 text-right">
                  <span className="flex items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      className="h-4 w-4"
                      aria-hidden="true"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    {t('navbar.account')}
                  </span>
                  <div className="mt-1 flex items-center justify-end gap-2 text-sm font-semibold text-gray-800">
                    <span>
                      {t('navbar.welcome')} {userDisplayName || 'User'}
                    </span>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-green-700 transition hover:bg-green-100 hover:text-green-800"
                      aria-label={t('navbar.logout')}
                      title={t('navbar.logout')}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <path d="M10 17l5-5-5-5"></path>
                        <path d="M15 12H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex min-h-[76px] flex-col justify-between rounded-2xl border border-green-100 bg-green-50/70 px-4 py-2 text-right">
                    <span className="flex items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-green-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9.5" cy="7" r="4"></circle>
                        <path d="M20 8v6"></path>
                        <path d="M23 11h-6"></path>
                      </svg>
                      {t('navbar.public')}
                    </span>
                    <div className="mt-1 flex flex-wrap justify-end gap-x-4 gap-y-1">
                      <Link to="/register" className="transition hover:text-green-700">
                        {t('navbar.register')}
                      </Link>

                      <Link to="/login" className="transition hover:text-green-700">
                        {t('navbar.login')}
                      </Link>
                    </div>
                  </div>

                  <div className="flex min-h-[76px] flex-col justify-between rounded-2xl border border-gray-200 bg-white px-4 py-2 text-right">
                    <span className="flex items-center justify-end gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-4 w-4"
                        aria-hidden="true"
                      >
                        <path d="M3 7h18"></path>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12"></path>
                        <path d="M9 7V5a3 3 0 0 1 6 0v2"></path>
                      </svg>
                      {t('navbar.seller')}
                    </span>
                    <div className="mt-1 flex flex-wrap justify-end gap-x-4 gap-y-1">
                      <Link to="/seller-login" className="transition hover:text-green-700">
                        {t('navbar.sellerLogin')}
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-extrabold tracking-[0.12em] uppercase bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 bg-clip-text text-transparent drop-shadow-sm">
                {t('app.title')}
              </h1>
              <div className="w-24 h-1 bg-green-600 mx-auto rounded-full mt-2"></div>
            </div>

            {!hideSearchBar && (
              <div className="flex w-full max-w-4xl flex-col items-stretch gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-center">
                <input
                  type="text"
                  onKeyUp={handleSearch}
                  className="min-w-0 flex-1 rounded border border-gray-300 px-4 py-2"
                  placeholder={t('navbar.searchPlaceholder')}
                />

                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="rounded border border-gray-300 px-3 py-2"
                >
                  <option value="">{t('navbar.allCategories')}</option>
                  <option value="ผ้า">{t('navbar.categories.fabric')}</option>
                  <option value="อาหาร">{t('navbar.categories.food')}</option>
                  <option value="งานคราฟต์">{t('navbar.categories.craft')}</option>
                </select>

                <select
                  onChange={(e) => setProvince(e.target.value)}
                  className="rounded border border-gray-300 px-3 py-2"
                >
                  <option value="">{t('navbar.allProvinces')}</option>
                  <option value="บึงกาฬ">{t('navbar.provinces.buengKan')}</option>
                </select>

                <button
                  onClick={applyFilter}
                  className="rounded bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700"
                >
                  {t('navbar.filter')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
