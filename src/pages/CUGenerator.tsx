import React, { useState } from 'react';
import { FileText, Download, Calendar, Users, AlertCircle, Upload } from 'lucide-react';

// Mock CU history data
const mockCUDocuments = [
  { 
    id: 1, 
    year: '2024', 
    employee: 'Maria Rossi',
    generatedDate: '2025-02-15',
    status: 'generated',
    totalIncome: '€ 14.400,00',
    totalTax: '€ 2.880,00'
  },
  { 
    id: 2, 
    year: '2024', 
    employee: 'Giuseppe Verdi',
    generatedDate: '2025-02-15',
    status: 'generated',
    totalIncome: '€ 9.300,00',
    totalTax: '€ 1.395,00'
  },
  { 
    id: 3, 
    year: '2023', 
    employee: 'Maria Rossi',
    generatedDate: '2024-02-20',
    status: 'submitted',
    submittedDate: '2024-03-15',
    totalIncome: '€ 13.600,00',
    totalTax: '€ 2.720,00'
  },
];

const CUGenerator: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [activeTab, setActiveTab] = useState('generate');
  
  // Format date to Italian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  // Get available years for selection
  const getAvailableYears = () => {
    const currentYear = new Date().getFullYear();
    return [
      currentYear.toString(),
      (currentYear - 1).toString(),
      (currentYear - 2).toString()
    ];
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'generated':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Generato
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Inviato
          </span>
        );
      default:
        return null;
    }
  };
  
  // Mock employee data
  const mockEmployees = [
    { id: 1, name: 'Maria Rossi', role: 'Badante', level: 'CS', hoursPerWeek: 40 },
    { id: 2, name: 'Giuseppe Verdi', role: 'Colf', level: 'B', hoursPerWeek: 25 },
    { id: 3, name: 'Anna Bianchi', role: 'Baby Sitter', level: 'BS', hoursPerWeek: 30 },
  ];
  
  return (
    <div className="pb-16 md:pb-0"> {/* Add padding for mobile navbar */}
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('generate')}
            className={`${
              activeTab === 'generate'
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FileText className="w-5 h-5 mr-2" />
            Genera CU
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${
              activeTab === 'history'
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Storico CU
          </button>
        </nav>
      </div>
      
      {/* Generate CU Tab */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-800" />
                  Genera Certificazione Unica
                </h3>
              </div>
              
              <div className="p-6">
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-blue-800 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">Informazioni sulla Certificazione Unica</p>
                      <p>La Certificazione Unica (CU) è un documento fiscale che attesta i redditi di lavoro dipendente, assimilati e di lavoro autonomo percepiti nel corso dell'anno di imposta.</p>
                      <p className="mt-1">Il datore di lavoro deve rilasciare la CU al lavoratore entro il 16 marzo dell'anno successivo a quello in cui sono stati corrisposti i compensi.</p>
                    </div>
                  </div>
                </div>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Year Selection */}
                    <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                        Anno di riferimento
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="year"
                          required
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(e.target.value)}
                          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          {getAvailableYears().map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    {/* Employee Selection */}
                    <div>
                      <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
                        Collaboratore
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                          id="employee"
                          required
                          value={selectedEmployee}
                          onChange={(e) => setSelectedEmployee(e.target.value)}
                          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option value="">Seleziona collaboratore</option>
                          {mockEmployees.map(employee => (
                            <option key={employee.id} value={employee.id.toString()}>
                              {employee.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Dati sostitutivi dichiarati</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Reddito complessivo:</p>
                        <p className="text-sm font-medium">€ 14.400,00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ritenute IRPEF:</p>
                        <p className="text-sm font-medium">€ 2.880,00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Contributi previdenziali:</p>
                        <p className="text-sm font-medium">€ 1.368,00</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">TFR accantonato:</p>
                        <p className="text-sm font-medium">€ 1.066,67</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-500">
                        Questi dati vengono calcolati automaticamente sulla base delle retribuzioni erogate nell'anno selezionato. Se necessiti di modificare questi valori, contatta l'assistenza.
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 space-y-4">
                    <div className="flex items-center">
                      <input
                        id="declarations"
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="declarations" className="ml-2 block text-sm text-gray-900">
                        Dichiaro che i dati riportati sono corretti e conformi alle retribuzioni erogate
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Anteprima
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 flex items-center justify-center"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Genera CU {selectedYear}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Info Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden h-full">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-800" />
                  Informazioni utili
                </h3>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Scadenze importanti</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs mr-2 mt-0.5">1</span>
                      <span><strong>16 Marzo:</strong> consegna CU al lavoratore</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs mr-2 mt-0.5">2</span>
                      <span><strong>31 Marzo:</strong> invio telematico CU all'Agenzia delle Entrate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs mr-2 mt-0.5">3</span>
                      <span><strong>31 Ottobre:</strong> termine ultimo per invio CU contenenti solo redditi esenti</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Modalità di consegna al lavoratore</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs mr-2 mt-0.5">✓</span>
                      <span>Stampa e consegna a mano con firma di ricevuta</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs mr-2 mt-0.5">✓</span>
                      <span>Invio tramite email con attestazione di ricezione</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-green-100 text-green-800 text-xs mr-2 mt-0.5">✓</span>
                      <span>Invio tramite PEC (ha valore legale)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-medium text-gray-900 mb-2">Invio telematico all'Agenzia delle Entrate</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Per l'invio telematico, puoi:
                  </p>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs mr-2 mt-0.5">1</span>
                      <span>Utilizzare i servizi telematici dell'Agenzia delle Entrate</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs mr-2 mt-0.5">2</span>
                      <span>Rivolgerti a un intermediario abilitato (commercialista, CAF)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Upload className="h-4 w-4 mr-2" />
                    Carica CU già generata
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* CU History Tab */}
      {activeTab === 'history' && (
        <div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-800" />
                Storico Certificazioni Uniche
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Anno
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Collaboratore
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data generazione
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reddito complessivo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Imposte
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockCUDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{document.year}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(document.generatedDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.totalIncome}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{document.totalTax}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(document.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-800 hover:text-blue-900 mr-3">
                          Visualizza
                        </button>
                        <button className="text-blue-800 hover:text-blue-900">
                          <Download className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Precedente
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Successivo
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Visualizzando <span className="font-medium">1</span> a <span className="font-medium">3</span> di <span className="font-medium">3</span> risultati
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CUGenerator;