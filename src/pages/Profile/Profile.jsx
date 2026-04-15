import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { authContext } from '../../context/Auth/Auth';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

export default function Profile() {
  const { t } = useTranslation();
  const { userDisplayName, userEmail, userRole } = useContext(authContext);

  const inputClassName =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100';

  const [firstName = '', ...restName] = (userDisplayName || '').split(' ');
  const lastName = restName.join(' ');
  const storedPhoneNumber = localStorage.getItem('userPhoneNumber') || '';
  const phoneNumber = storedPhoneNumber || '-';
  const isPhoneNumberValid = /^[0-9]{9,10}$/.test(storedPhoneNumber.trim());

  const fields = [
    {
      label: t('profile.firstName'),
      value: firstName || '-',
      span: '',
    },
    {
      label: t('profile.lastName'),
      value: lastName || '-',
      span: '',
    },
    {
      label: t('profile.email'),
      value: userEmail || '-',
      span: 'md:col-span-2',
    },
    {
      label: t('profile.phoneNumber'),
      value: phoneNumber,
      span: 'md:col-span-2',
    },
  ];

  function handleEmailVerification() {
    toast.success(t('profile.emailVerifySent'));
  }

  function handlePhoneVerification() {
    toast.success(t('profile.phoneVerifySent'));
  }

  return (
    <>
      <Helmet>
        <title>{t('profile.title')}</title>
      </Helmet>

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-50 via-white to-lime-50 shadow-[0_24px_80px_rgba(22,101,52,0.12)] ring-1 ring-green-100">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 px-8 py-12 text-white md:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-green-100">
                {t('profile.eyebrow')}
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                {userDisplayName || t('profile.defaultName')}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-green-50/90">
                {t('profile.subtitle')}
              </p>

              <div className="mt-10 space-y-4 text-sm text-green-50/95">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300"></span>
                  <p>{t('profile.manageAccountText')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300"></span>
                  <p>{t('profile.platformAccessText')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300"></span>
                  <p>{t('profile.verifyHint')}</p>
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-white/10 px-4 py-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-100">
                    {t('profile.role')}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {userRole === 'seller'
                      ? t('profile.roles.seller')
                      : t('profile.roles.general')}
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white/10 px-4 py-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-100">
                    {t('profile.status')}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {t('profile.active')}
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-white/10 px-4 py-4 ring-1 ring-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-100">
                    {t('profile.emailVerified')}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {t('profile.pending')}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-10 md:px-10">
              <div className="mx-auto max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('profile.accountOverview')}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {t('profile.formSubtitle')}
                </p>

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  {fields.map((field) => (
                    <div key={field.label} className={field.span}>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        value={field.value}
                        readOnly
                        className={`${inputClassName} bg-gray-50 text-gray-600`}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3">
                  <button
                    type="button"
                    onClick={handleEmailVerification}
                    className="w-full rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    {t('profile.verifyEmailButton')}
                  </button>
                  <button
                    type="button"
                    onClick={handlePhoneVerification}
                    disabled={!isPhoneNumberValid}
                    className="w-full rounded-2xl border border-green-700 px-5 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    {t('profile.verifyPhoneButton')}
                  </button>
                  {!isPhoneNumberValid && (
                    <p className="text-sm text-amber-700">
                      {t('profile.invalidPhoneNumberHint')}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
