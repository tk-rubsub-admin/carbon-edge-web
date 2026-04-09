import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { t } = useTranslation();
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const inputClassName =
    'w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100';

  const validate = Yup.object({
    firstName: Yup.string()
      .trim()
      .required(t('auth.validations.firstNameRequired'))
      .min(2, t('auth.validations.firstNameMin')),
    lastName: Yup.string()
      .trim()
      .required(t('auth.validations.lastNameRequired'))
      .min(2, t('auth.validations.lastNameMin')),
    email: Yup.string()
      .trim()
      .email(t('auth.validations.emailInvalid'))
      .nullable(),
    phoneNumber: Yup.string()
      .required(t('auth.validations.phoneRequired'))
      .matches(/^[0-9]{9,10}$/, t('auth.validations.phoneInvalid')),
    password: Yup.string()
      .required(t('auth.validations.passwordRequired'))
      .min(8, t('auth.validations.passwordMin')),
    repassword: Yup.string()
      .required(t('auth.validations.repasswordRequired'))
      .oneOf([Yup.ref('password')], t('auth.validations.repasswordMatch')),
  });

  function handleRegister(values) {
    setIsLoading(true);
    setErr(null);

    const payload = {
      name: `${values.firstName.trim()} ${values.lastName.trim()}`.trim(),
      email:
        values.email?.trim() ||
        `${values.phoneNumber.trim()}@placeholder.local`,
      password: values.password,
      rePassword: values.repassword,
      phone: values.phoneNumber.trim(),
    };

    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', payload)
      .then((res) => {
        setIsLoading(false);
        localStorage.setItem(
          'userDisplayName',
          `${values.firstName.trim()} ${values.lastName.trim()}`.trim()
        );
        toast.success(t('auth.registerSuccess'));
        if (res.data.message === 'success') {
          navigate('/login');
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErr(error.response?.data?.message || t('auth.registerError'));
        toast.error(t('auth.registerError'));
      });
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      repassword: '',
    },
    validationSchema: validate,
    onSubmit: handleRegister,
  });

  const fields = [
    {
      name: 'firstName',
      label: t('auth.firstName'),
      type: 'text',
      placeholder: t('auth.firstNamePlaceholder'),
    },
    {
      name: 'lastName',
      label: t('auth.lastName'),
      type: 'text',
      placeholder: t('auth.lastNamePlaceholder'),
    },
    {
      name: 'email',
      label: t('auth.emailOptional'),
      type: 'email',
      placeholder: t('auth.emailPlaceholder'),
    },
    {
      name: 'phoneNumber',
      label: t('auth.phoneNumber'),
      type: 'tel',
      placeholder: t('auth.phonePlaceholder'),
    },
    {
      name: 'password',
      label: t('auth.password'),
      type: 'password',
      placeholder: t('auth.passwordPlaceholder'),
    },
    {
      name: 'repassword',
      label: t('auth.repassword'),
      type: 'password',
      placeholder: t('auth.repasswordPlaceholder'),
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t('auth.registerTitle')}</title>
      </Helmet>

      <section className="px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-green-50 via-white to-lime-50 shadow-[0_24px_80px_rgba(22,101,52,0.12)] ring-1 ring-green-100">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="bg-gradient-to-br from-green-800 via-green-700 to-emerald-600 px-8 py-12 text-white md:px-10">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-green-100">
                Carbon Edge
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                {t('auth.registerHeroTitle')}
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-green-50/90">
                {t('auth.registerHeroText')}
              </p>
              <div className="mt-10 space-y-4 text-sm text-green-50/95">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300"></span>
                  <p>{t('auth.registerFeature1')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300"></span>
                  <p>{t('auth.registerFeature2')}</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-lime-300"></span>
                  <p>{t('auth.registerFeature3')}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-10 md:px-10">
              <div className="mx-auto max-w-xl">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {t('auth.registerTitle')}
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  {t('auth.registerSubtitle')}
                </p>

                {err && (
                  <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {err}
                  </div>
                )}

                <form
                  method="post"
                  className="mt-8 space-y-5"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="grid gap-5 md:grid-cols-2">
                    {fields.map((field) => (
                      <div
                        key={field.name}
                        className={
                          field.name === 'email' ||
                          field.name === 'phoneNumber' ||
                          field.name === 'password' ||
                          field.name === 'repassword'
                            ? 'md:col-span-2'
                            : ''
                        }
                      >
                        <label
                          htmlFor={field.name}
                          className="mb-2 block text-sm font-medium text-gray-700"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          value={formik.values[field.name]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className={inputClassName}
                        />
                        {formik.touched[field.name] &&
                          formik.errors[field.name] && (
                            <p className="mt-2 text-sm text-red-600">
                              {formik.errors[field.name]}
                            </p>
                          )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? t('auth.registerLoading') : t('auth.registerButton')}
                  </button>
                </form>

                <p className="mt-6 text-sm text-gray-600">
                  {t('auth.hasAccount')}{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-green-700 underline underline-offset-4 transition hover:text-green-800"
                  >
                    {t('auth.loginLink')}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
