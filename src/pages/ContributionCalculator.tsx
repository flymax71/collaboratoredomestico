import React, { useState } from 'react';
import { Calculator, Download, Calendar, FileText, AlertCircle, BarChart2, DollarSign } from 'lucide-react';

// Mock contribution history data
const mockContributions = [
  { 
    id: 1, 
    period: '1° Trimestre 2025', 
    months: 'Gennaio - Marzo 2025',
    dueDate: '2025-04-10',
    amount: '€ 780,00',
    status: 'pending'
  },
  { 
    id: 2, 
    period: '4° Trimestre 2024', 
    months: 'Ottobre - Dicembre 2024',
    dueDate: '2025-01-10',
    amount: '€ 780,00',
    status: 'paid',
    paymentDate: '2025-01-08'
  },
  { 
    id: 3, 
    period: '3° Trimestre 2024', 
    months: 'Luglio - Settembre 2024',
    dueDate: '2024-10-10',
    amount: '€ 780,00',
    status: 'paid',
    paymentDate: '2024-10-05'
  },
  { 
    id: 4, 
    period: '2° Trimestre 2024', 
    months: 'Aprile - Giugno 2024',
    dueDate: '2024-07-10',
    amount: '€ 780,00',
    status: 'paid',
    paymentDate: '2024-07-08'
  },
];

// Mock current quarter data
const mockCurrentQuarterData = {
  quarter: '1° Trimestre 2025',
  dueDate: '2025-04-10',
  employees: [
    { 
      id: 1, 
      name: 'Maria Rossi', 
      level: 'CS', 
      hours: 480, 
      grossSalary: '€ 5.640,00',
      employerContribution: '€ 422,76',
      employeeContribution: '€ 141,00',
      totalContribution: '€ 563,76'
    },
    { 
      id: 2, 
      name: 'Giuseppe Verdi', 
      level: 'B', 
      hours: 300, 
      grossSalary: '€ 2.850,00',
      employerContribution: '€ 213,75',
      employeeContribution: '€ 71,25',
      totalContribution: '€ 285,00'
    },
  ],
  totals: {
    grossSalary: '€ 8.490,00',
    employerContribution: '€ 636,51',
    employeeContribution: '€ 212,25',
    total: '€ 848,76'
  }
};

const ContributionCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Handle calculate
  const handleCalculate = () => {
    setIsCalculating(true);
    // Simulate API call
    setTimeout(() => {
      setIsCalculating(false);
    }, 1500);
  };
  
  // Format date to Italian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Pagato
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            In scadenza
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Scaduto
          </span>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="pb-16 md:pb-0"> {/* Add padding for mobile navbar */}
      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('current')}
            className={`${
              activeTab === 'current'
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <Calculator className="w-5 h-5 mr-2" />
            Trimestre corrente
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`${
              activeTab === 'history'
                ? 'border-blue-800 text-blue-800'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm flex items-center`}
          >
            <FileText className="w-5 h-5 mr-2" />
            Storico contributi
          </button>
        </nav>
      </div>
      
      {/* Current Quarter Tab */}
      {activeTab === 'current' && (
        <div>
          {/* Alert */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
            <span className="text-sm text-yellow-800">
              I contributi INPS per il trimestre corrente sono in scadenza il {formatDate(mockCurrentQuarterData.dueDate)}.
            </span>
          </div>
          
          {/* Quarter Summary Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-800" />
                {mockCurrentQuarterData.quarter}
              </h3>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 rounded-md p-4 flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-3">
                    <DollarSign className="h-6 w-6 text-blue-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Retribuzione lorda</p>
                    <p className="text-xl font-semibold text-gray-900">{mockCurrentQuarterData.totals.grossSalary}</p>
                  </div>
                </div>
                
                <div className="bg-teal-50 rounded-md p-4 flex items-center">
                  <div className="bg-teal-100 rounded-full p-3 mr-3">
                    <Calculator className="h-6 w-6 text-teal-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contributi datore</p>
                    <p className="text-xl font-semibold text-gray-900">{mockCurrentQuarterData.totals.employerContribution}</p>
                  </div>
                </div>
                
                <div className="bg-amber-50 rounded-md p-4 flex items-center">
                  <div className="bg-amber-100 rounded-full p-3 mr-3">
                    <BarChart2 className="h-6 w-6 text-amber-800" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contributi totali</p>
                    <p className="text-xl font-semibold text-gray-900">{mockCurrentQuarterData.totals.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">Dettaglio contributi per collaboratore</h4>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Collaboratore
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Livello
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ore totali
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Retribuzione lorda
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contributi datore
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contributi lavoratore
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Totale contributi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockCurrentQuarterData.employees.map((employee) => (
                        <tr key={employee.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.level}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.hours}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.grossSalary}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.employerContribution}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{employee.employeeContribution}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{employee.totalContribution}</div>
                          </td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900">Totali:</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{mockCurrentQuarterData.totals.grossSalary}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{mockCurrentQuarterData.totals.employerContribution}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{mockCurrentQuarterData.totals.employeeContribution}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{mockCurrentQuarterData.totals.total}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
                <button 
                  onClick={handleCalculate}
                  disabled={isCalculating}
                  className={`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 flex items-center justify-center ${
                    isCalculating ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  {isCalculating ? 'Ricalcolo in corso...' : 'Ricalcola contributi'}
                </button>
                <button className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 flex items-center justify-center">
                  <Download className="h-4 w-4 mr-2" />
                  Genera MAV INPS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Contribution History Tab */}
      {activeTab === 'history' && (
        <div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-800" />
                Storico contributi INPS
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Periodo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mesi
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Scadenza
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Importo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data pagamento
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockContributions.map((contribution) => (
                    <tr key={contribution.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contribution.period}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contribution.months}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(contribution.dueDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contribution.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(contribution.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {contribution.paymentDate ? formatDate(contribution.paymentDate) : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-800 hover:text-blue-900 mr-3">
                          Dettagli
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
                      Visualizzando <span className="font-medium">1</span> a <span className="font-medium">4</span> di <span className="font-medium">8</span> risultati
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Precedente</span>
                        &laquo;
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-800 hover:bg-blue-100">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Successivo</span>
                        &raquo;
                      </button>
                    </nav>
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

export default ContributionCalculator;