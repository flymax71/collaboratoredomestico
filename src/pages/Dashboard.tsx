import React, { useState } from 'react';
import { User, AlertCircle, Calendar, Receipt, Calculator } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useEmployees } from '../contexts/EmployeeContext';

const mockUpcomingDeadlines = [
  { id: 1, title: 'Pagamento contributi INPS', date: '2025-04-10', type: 'contribution' },
  { id: 2, title: 'Cedolino Marzo', date: '2025-03-31', type: 'payslip' },
  { id: 3, title: 'Rinnovo contratto Maria Rossi', date: '2025-05-15', type: 'contract' },
];

// Card component
interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg shadow p-5 transition-all hover:shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

// Alert component
interface AlertProps {
  message: string;
  type: 'info' | 'warning' | 'success';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const colors = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    success: 'bg-green-50 text-green-800 border-green-200',
  };

  return (
    <div className={`${colors[type]} border p-4 rounded-md mb-6 flex items-start justify-between`}>
      <div className="flex">
        <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
        <span>{message}</span>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-gray-500 hover:text-gray-700"
      >
        &times;
      </button>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { employees } = useEmployees();
  
  // Get current quarter
  const getCurrentQuarter = () => {
    const month = new Date().getMonth();
    return Math.floor(month / 3) + 1;
  };

  // Format date to Italian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  // Get icon for deadline type
  const getDeadlineIcon = (type: string) => {
    switch (type) {
      case 'contribution':
        return <Calculator className="w-5 h-5 text-blue-800" />;
      case 'payslip':
        return <Receipt className="w-5 h-5 text-green-800" />;
      default:
        return <Calendar className="w-5 h-5 text-yellow-800" />;
    }
  };

  return (
    <div className="pb-16 md:pb-0">
      {/* Welcome message and alerts */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Benvenuto, {user?.name || 'Utente'}</h2>
        <Alert 
          message={`Il pagamento dei contributi INPS per il ${getCurrentQuarter()}° trimestre è in scadenza il 10 Aprile. Accedi alla sezione Contributi per generare il MAV.`}
          type="warning"
        />
      </div>
      
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card 
          title="Collaboratori attivi" 
          value={employees.length} 
          icon={<User className="w-5 h-5 text-white" />}
          color="bg-blue-800 text-white"
        />
        <Card 
          title="Cedolini generati" 
          value={8} 
          icon={<Receipt className="w-5 h-5 text-white" />}
          color="bg-teal-600 text-white"
        />
        <Card 
          title="Contributi versati (€)" 
          value="1.256,00" 
          icon={<Calculator className="w-5 h-5 text-white" />}
          color="bg-green-600 text-white"
        />
        <Card 
          title="Prossima scadenza" 
          value={formatDate(mockUpcomingDeadlines[0].date)} 
          icon={<Calendar className="w-5 h-5 text-white" />}
          color="bg-yellow-600 text-white"
        />
      </div>
      
      {/* Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employees section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-blue-800 text-white py-3 px-4">
            <h3 className="font-semibold">Collaboratori</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {employees.map(employee => (
              <div key={employee.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{employee.name}</p>
                    <p className="text-sm text-gray-500">{employee.role} • Livello {employee.level}</p>
                  </div>
                  <div className="text-sm text-gray-700 font-medium">
                    {employee.hoursPerWeek} ore/sett.
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 py-2 px-4 border-t border-gray-200">
            <button className="text-sm text-blue-800 font-medium hover:text-blue-900">
              Gestisci collaboratori →
            </button>
          </div>
        </div>
        
        {/* Upcoming deadlines section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-yellow-600 text-white py-3 px-4">
            <h3 className="font-semibold">Scadenze in arrivo</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {mockUpcomingDeadlines.map(deadline => (
              <div key={deadline.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="mr-3">
                      {getDeadlineIcon(deadline.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{deadline.title}</p>
                      <p className="text-sm text-gray-500">{formatDate(deadline.date)}</p>
                    </div>
                  </div>
                  <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-gray-800 transition-colors">
                    Gestisci
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 py-2 px-4 border-t border-gray-200">
            <button className="text-sm text-yellow-700 font-medium hover:text-yellow-800">
              Visualizza calendario →
            </button>
          </div>
        </div>
        
        {/* Quick actions section */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-teal-600 text-white py-3 px-4">
            <h3 className="font-semibold">Azioni rapide</h3>
          </div>
          <div className="p-4 space-y-3">
            <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-800 py-3 px-4 rounded-md text-left font-medium transition-colors flex items-center">
              <Receipt className="w-5 h-5 mr-2" />
              Genera nuovo cedolino
            </button>
            <button className="w-full bg-teal-50 hover:bg-teal-100 text-teal-800 py-3 px-4 rounded-md text-left font-medium transition-colors flex items-center">
              <Calculator className="w-5 h-5 mr-2" />
              Calcola contributi INPS
            </button>
            <button className="w-full bg-yellow-50 hover:bg-yellow-100 text-yellow-800 py-3 px-4 rounded-md text-left font-medium transition-colors flex items-center">
              <User className="w-5 h-5 mr-2" />
              Aggiungi collaboratore
            </button>
            <button className="w-full bg-green-50 hover:bg-green-100 text-green-800 py-3 px-4 rounded-md text-left font-medium transition-colors flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Pianifica ferie e assenze
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;