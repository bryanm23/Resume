import React, { useEffect } from 'react';
import { useForm, RegisterOptions } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FormInput from '../components/shared/FormInput';
import useAuthStore from '../store/authStore';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>();

  // Clear any auth errors when component unmounts or when user starts typing
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const onSubmit = async (data: SignupFormData) => {
    try {
      clearError(); // Clear any previous errors
      await signup(data.name, data.email, data.password);
      navigate('/');
    } catch (err: any) {
      // Set form-specific errors if they exist
      if (err.response?.data?.errors) {
        err.response.data.errors.forEach((error: any) => {
          setError(error.param as keyof SignupFormData, {
            type: 'manual',
            message: error.msg,
          });
        });
      }
      // Error message is handled by the store
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-black relative overflow-hidden"
    >
      {/* Animated cyber background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="cyber-grid" />
      </div>

      {/* Glowing circuit lines */}
      <div className="absolute inset-0">
        <div className="circuit-lines" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-8"
        >
          <div className="cyber-shield-icon" />
        </motion.div>
        
        <h2 className="text-center text-4xl font-extrabold text-cyan-400 cyber-glitch-text">
          Secure Access Protocol
        </h2>
        <p className="mt-2 text-center text-sm text-cyan-300">
          Already have clearance?{' '}
          <Link
            to="/login"
            className="font-medium text-cyan-500 hover:text-cyan-400 cyber-link"
            onClick={clearError}
          >
            Initialize Login
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-gray-900/80 backdrop-blur-xl py-8 px-4 shadow-2xl shadow-cyan-500/20 sm:rounded-lg sm:px-10 border border-cyan-500/30">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormInput
              id="name"
              label="Operative Name"
              type="text"
              register={register}
              rules={{
                required: 'Operative name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters long'
                }
              } as RegisterOptions}
              error={errors.name?.message}
              onChange={clearError}
            />

            <FormInput
              id="email"
              label="Secure Communication Channel (Email)"
              type="email"
              register={register}
              rules={{
                required: 'Secure channel is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid communication channel format'
                }
              } as RegisterOptions}
              error={errors.email?.message}
              onChange={clearError}
            />

            <FormInput
              id="password"
              label="Encryption Key (Password)"
              type="password"
              register={register}
              rules={{
                required: 'Encryption key is required',
                minLength: {
                  value: 6,
                  message: 'Encryption key must be at least 6 characters long'
                }
              } as RegisterOptions}
              error={errors.password?.message}
              onChange={clearError}
            />

            {error && (
              <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md border border-red-500/50">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-cyan-500 rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 transition-all duration-200 relative overflow-hidden group"
              >
                <span className="relative z-10">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Initializing Security Protocol...
                    </>
                  ) : (
                    'Initialize Secure Access'
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-cyan-800" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-cyan-400">
                  Alternative Access Protocols
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="w-full inline-flex justify-center py-2 px-4 border border-cyan-800 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-cyan-400 hover:bg-gray-700 transition-colors duration-200 group relative overflow-hidden"
                onClick={() => {
                  console.log('GitHub OAuth not implemented yet');
                }}
              >
                <span className="relative z-10 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  GitHub Authentication Protocol
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Signup; 