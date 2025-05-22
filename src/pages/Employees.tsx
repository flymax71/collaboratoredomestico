import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Users, Filter } from 'lucide-react';
import { useEmployees } from '../contexts/EmployeeContext';

// Employee level options with descriptions
const employeeLevels = [
  { value: 'A', label: 'A - Collaboratore generico non formato' },
  { value: 'AS', label: 'AS - Collaboratore con esperienza' },
  { value: 'B', label: 'B - Collaboratore generico polifunzionale' },
  { value: 'BS', label: 'BS - Assistente a persone autosufficienti' },
  { value: 'C', label: 'C - Cuoco' },
  { value: 'CS', label: 'CS - Assistente a persone non autosufficienti' },
  { value: 'D', label: 'D - Amministratore proprietà' },
  { value: 'DS', label: 'DS - Assistente con diploma specifico' },
];

const Employees: React.FC = () => {
  const { employees, deleteEmployee } = useEmployees();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get filtered employees
  const filteredEmployees = employees.filter(employee => 
    searchQuery === '' || 
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.level.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle delete click
  const handleDeleteClick = (employeeId: number) => {
    setEmployeeToDelete(employeeId);
    setShowDeleteModal(true);
  };
  
  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (employeeToDelete) {
      deleteEmployee(employeeToDelete);
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
    }
  };
  
  // Format date to Italian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  return (
    <div className="pb-16 md:pb-0">
      {/* Header with search and add button */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cerca collaboratori..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            <Filter className="h-4 w-4 mr-2" />
            Filtri
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuovo collaboratore
          </button>
        </div>
      </div>
      
      {/* Stats */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500">Totale collaboratori</p>
            <p className="text-2xl font-semibold">{employees.length}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Ore settimanali totali</p>
            <p className="text-2xl font-semibold">
              {employees.reduce((total, emp) => total + emp.hoursPerWeek, 0)}
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500">Costo mensile stimato</p>
            <p className="text-2xl font-semibold">€ 3.850,00</p>
          </div>
        </div>
      </div>
      
      {/* Employee list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-800" />
            Lista collaboratori
          </h3>
          <span className="text-sm text-gray-500">
            {filteredEmployees.length} risultati
          </span>
        </div>
        
        {filteredEmployees.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredEmployees.map(employee => (
              <div key={employee.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center">
                      <h4 className="text-lg font-medium text-gray-900">{employee.name}</h4>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Livello {employee.level}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{employee.role}</p>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Data assunzione:</span> {formatDate(employee.startDate)}
                      </div>
                      <div>
                        <span className="text-gray-500">Ore settimanali:</span> {employee.hoursPerWeek}
                      </div>
                      <div>
                        <span className="text-gray-500">Telefono:</span> {employee.phone}
                      </div>
                      <div>
                        <span className="text-gray-500">Email:</span> {employee.email}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-500">Indirizzo:</span> {employee.address}
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-gray-500">Vitto e alloggio:</span> {employee.roomAndBoard ? 'Sì' : 'No'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      <Edit className="h-4 w-4 mr-1" />
                      Modifica
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(employee.id)}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded text-red-700 bg-white hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Elimina
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">Nessun collaboratore trovato con questi criteri di ricerca.</p>
          </div>
        )}
      </div>
      
      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowAddModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Aggiungi nuovo collaboratore</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Nome e cognome"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Ruolo
                  </label>
                  <select
                    id="role"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Seleziona ruolo</option>
                    <option value="Badante">Badante</option>
                    <option value="Colf">Colf</option>
                    <option value="Baby Sitter">Baby Sitter</option>
                    <option value="Cuoco">Cuoco</option>
                    <option value="Autista">Autista</option>
                    <option value="Giardiniere">Giardiniere</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                    Livello CCNL
                  </label>
                  <select
                    id="level"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Seleziona livello</option>
                    {employeeLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    Data di assunzione
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="hoursPerWeek" className="block text-sm font-medium text-gray-700">
                    Ore settimanali
                  </label>
                  <input
                    type="number"
                    id="hoursPerWeek"
                    min="1"
                    max="54"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="roomAndBoard" className="block text-sm font-medium text-gray-700">
                    Vitto e alloggio
                  </label>
                  <select
                    id="roomAndBoard"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="false">No</option>
                    <option value="true">Sì</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="+39 333 1234567"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="email@example.com"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Indirizzo
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Via, numero civico, città, CAP"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Note aggiuntive
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Inserisci eventuali note..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
                >
                  Salva
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowDeleteModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Conferma eliminazione</h3>
              <p className="text-sm text-gray-500 mb-6">
                Sei sicuro di voler eliminare questo collaboratore? Questa azione non può essere annullata.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  Elimina
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;