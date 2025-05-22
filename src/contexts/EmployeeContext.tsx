import React, { createContext, useContext, useState } from 'react';

// Employee type definition
interface Employee {
  id: number;
  name: string;
  role: string;
  level: string;
  startDate: string;
  hoursPerWeek: number;
  roomAndBoard: boolean;
  phone: string;
  email: string;
  address: string;
}

// Context type definition
interface EmployeeContextType {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  deleteEmployee: (id: number) => void;
}

const initialEmployees = [
  { 
    id: 1, 
    name: 'Maria Rossi', 
    role: 'Badante', 
    level: 'CS', 
    startDate: '2024-01-15', 
    hoursPerWeek: 40,
    roomAndBoard: true,
    phone: '+39 333 1234567',
    email: 'maria.rossi@example.com',
    address: 'Via Roma 123, Milano'
  },
  { 
    id: 2, 
    name: 'Giuseppe Verdi', 
    role: 'Colf', 
    level: 'B', 
    startDate: '2023-06-10', 
    hoursPerWeek: 25,
    roomAndBoard: false,
    phone: '+39 333 7654321',
    email: 'giuseppe.verdi@example.com',
    address: 'Via Garibaldi 45, Milano'
  },
  { 
    id: 3, 
    name: 'Anna Bianchi', 
    role: 'Baby Sitter', 
    level: 'BS', 
    startDate: '2024-02-01', 
    hoursPerWeek: 30,
    roomAndBoard: false,
    phone: '+39 333 9876543',
    email: 'anna.bianchi@example.com',
    address: 'Via Dante 78, Milano'
  },
];

const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  setEmployees: () => {},
  deleteEmployee: () => {},
});

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const deleteEmployee = (id: number) => {
    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.id !== id));
  };

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, deleteEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};