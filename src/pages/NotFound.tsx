import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center">
          <ClipboardCheck className="w-12 h-12 text-blue-800" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Pagina non trovata
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
          >
            <Home className="h-4 w-4 mr-2" />
            Torna alla dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;