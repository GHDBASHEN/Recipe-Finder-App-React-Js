import React from "react";

const Register = () => {
  return (
    <div className="bg-transparent flex items-center justify-center min-h-screen">
      <div className="bg-white  p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button className="w-full bg-blue-800 text-white py-2 rounded-lg font-medium flex items-center justify-center hover:bg-blue-900 mb-2">
          <i className="fab fa-facebook-f mr-2"></i> Login with Facebook
        </button>
        <button className="w-full bg-white text-gray-700 border border-gray-300 py-2 rounded-lg font-medium flex items-center justify-center hover:bg-gray-100">
          <i className="fab fa-google mr-2 text-red-500"></i> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
