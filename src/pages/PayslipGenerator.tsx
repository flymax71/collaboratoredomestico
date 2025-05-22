import React, { useState } from 'react';
import { Calendar, Users, Calculator, Download, FileText, UploadCloud, AlertCircle, Check } from 'lucide-react';

// Mock employee data
const mockEmployees = [
  { id: 1, name: 'Maria Rossi', role: 'Badante', level: 'CS', hoursPerWeek: 40 },
  { id: 2, name: 'Giuseppe Verdi', role: 'Colf', level: 'B', hoursPerWeek: 25 },
  { id: 3, name: 'Anna Bianchi', role: 'Baby Sitter', level: 'BS', hoursPerWeek: 30 },
];

// Mock payslip history data
const mockPayslips = [
  { id: 1, employee: 'Maria Rossi', month: 'Febbraio 2025', amount: '€ 1.250,00', paid: true, date: '2025-02-28' },
  { id: 2, employee: 'Giuseppe Verdi', month: 'Febbraio 2025', amount: '€ 780,00', paid: true, date: '2025-02-28' },
  { id: 3, employee: 'Anna Bianchi', month: 'Febbraio 2025', amount: '€ 930,00', paid: true, date: '2025-02-28' },
  { id: 4, employee: 'Maria Rossi', month: 'Gennaio 2025', amount: '€ 1.250,00', paid: true, date: '2025-01-31' },
  { id: 5, employee: 'Giuseppe Verdi', month: 'Gennaio 2025', amount: '€ 780,00', paid: true, date: '2025-01-31' },
];

const PayslipGenerator: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [regularHours, setRegularHours] = useState(0);
  const [overtimeHours, setOvertimeHours] = useState(0);
  const [holidayHours, setHolidayHours] = useState(0);
  const [absenceDays, setAbsenceDays] = useState(0);
  const [isPreviewReady, setIsPreviewReady] = useState(false);
  const [activeTab, setActiveTab] = useState('generate');
  
  // Get current month and year for default selection
  const getCurrentMonthYear = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return `${year}-${month.toString().padStart(2, '0')}`;
  };
  
  // Handle generate preview
  const handleGeneratePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPreviewReady(true);
  };
  
  // Format date to Italian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  // Generate month name from YYYY-MM format
  const formatMonthYear = (monthYear: string) => {
    if (!monthYear) return '';
    
    const [year, month] = monthYear.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    
    return date.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
  };
  
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
            <Calculator className="w-5 h-5 mr-2" />
            Genera cedolino
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
            Storico cedolini
          </button>
        </nav>
      </div>
      
      {/* Generate Payslip Tab */}
      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-blue-800" />
                  Genera nuovo cedolino
                </h3>
              </div>
              
              <form onSubmit={handleGeneratePreview} className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                            {employee.name} - {employee.role} ({employee.level})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Month Selection */}
                  <div>
                    <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                      Mese di riferimento
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="month"
                        id="month"
                        required
                        value={selectedMonth || getCurrentMonthYear()}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="block w-full pl-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Regular Hours */}
                  <div>
                    <label htmlFor="regularHours" className="block text-sm font-medium text-gray-700">
                      Ore ordinarie
                    </label>
                    <input
                      type="number"
                      id="regularHours"
                      min="0"
                      value={regularHours || ''}
                      onChange={(e) => setRegularHours(parseInt(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  {/* Overtime Hours */}
                  <div>
                    <label htmlFor="overtimeHours" className="block text-sm font-medium text-gray-700">
                      Ore straordinarie
                    </label>
                    <input
                      type="number"
                      id="overtimeHours"
                      min="0"
                      value={overtimeHours || ''}
                      onChange={(e) => setOvertimeHours(parseInt(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  {/* Holiday Hours */}
                  <div>
                    <label htmlFor="holidayHours" className="block text-sm font-medium text-gray-700">
                      Ore festive
                    </label>
                    <input
                      type="number"
                      id="holidayHours"
                      min="0"
                      value={holidayHours || ''}
                      onChange={(e) => setHolidayHours(parseInt(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  {/* Absence Days */}
                  <div>
                    <label htmlFor="absenceDays" className="block text-sm font-medium text-gray-700">
                      Giorni di assenza
                    </label>
                    <input
                      type="number"
                      id="absenceDays"
                      min="0"
                      max="31"
                      value={absenceDays || ''}
                      onChange={(e) => setAbsenceDays(parseInt(e.target.value) || 0)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-4">
                  <div className="flex items-center">
                    <input
                      id="roomAndBoard"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="roomAndBoard" className="ml-2 block text-sm text-gray-900">
                      Includere indennità vitto e alloggio
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="autoTfr"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="autoTfr" className="ml-2 block text-sm text-gray-900">
                      Calcola automaticamente rateo TFR
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Pulisci campi
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
                  >
                    Genera anteprima
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden h-full flex flex-col">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-blue-800" />
                  Anteprima cedolino
                </h3>
              </div>
              
              {!isPreviewReady ? (
                <div className="flex-1 flex items-center justify-center p-6 text-center">
                  <div>
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">
                      Compila il form e genera l'anteprima per visualizzare i calcoli dettagliati.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 p-6 space-y-6">
                  <div className="text-center border-b border-gray-200 pb-4">
                    <h4 className="text-lg font-medium">
                      {selectedEmployee ? mockEmployees.find(e => e.id.toString() === selectedEmployee)?.name : 'Collaboratore'}
                    </h4>
                    <p className="text-gray-500">Cedolino {formatMonthYear(selectedMonth)}</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Ore ordinarie:</span>
                      <span className="text-sm font-medium">{regularHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Ore straordinarie:</span>
                      <span className="text-sm font-medium">{overtimeHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Ore festive:</span>
                      <span className="text-sm font-medium">{holidayHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Giorni di assenza:</span>
                      <span className="text-sm font-medium">{absenceDays}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Retribuzione lorda:</span>
                        <span className="text-sm font-medium">€ 1.280,00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Contributi INPS:</span>
                        <span className="text-sm font-medium">€ 128,00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">IRPEF:</span>
                        <span className="text-sm font-medium">€ 192,00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">TFR accantonato:</span>
                        <span className="text-sm font-medium">€ 94,81</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Netto da pagare:</span>
                        <span>€ 960,00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-center">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900">
                      <Download className="h-4 w-4 mr-2" />
                      Genera PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Payslip History Tab */}
      {activeTab === 'history' && (
        <div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-800" />
                Storico cedolini
              </h3>
              <button className="text-sm flex items-center text-blue-800 hover:text-blue-900">
                <UploadCloud className="h-4 w-4 mr-1" />
                Esporta tutto
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Collaboratore
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mese
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Importo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stato
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Azioni
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPayslips.map((payslip) => (
                    <tr key={payslip.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payslip.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payslip.month}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{payslip.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payslip.paid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payslip.paid ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Pagato
                            </>
                          ) : (
                            'Da pagare'
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{formatDate(payslip.date)}</div>
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
                      Visualizzando <span className="font-medium">1</span> a <span className="font-medium">5</span> di <span className="font-medium">12</span> risultati
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
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
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

export default PayslipGenerator;