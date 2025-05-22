import React, { useState } from 'react';
import { Folder, Upload, Download, FileText, FilePlus, Search, Trash2, Filter } from 'lucide-react';

// Mock document data
const mockDocuments = [
  { 
    id: 1, 
    name: 'Contratto Maria Rossi.pdf', 
    type: 'contract',
    employee: 'Maria Rossi',
    uploadDate: '2024-12-15',
    size: '1.2 MB'
  },
  { 
    id: 2, 
    name: 'Documento Identità Giuseppe Verdi.pdf', 
    type: 'identity',
    employee: 'Giuseppe Verdi',
    uploadDate: '2024-06-02',
    size: '980 KB'
  },
  { 
    id: 3, 
    name: 'Certificato Medico Anna Bianchi.pdf', 
    type: 'medical',
    employee: 'Anna Bianchi',
    uploadDate: '2025-02-10',
    size: '685 KB'
  },
  { 
    id: 4, 
    name: 'Permesso Soggiorno Maria Rossi.pdf', 
    type: 'permit',
    employee: 'Maria Rossi',
    uploadDate: '2024-12-15',
    size: '1.5 MB'
  },
  { 
    id: 5, 
    name: 'Comunicazione INPS Q4 2024.pdf', 
    type: 'inps',
    employee: '',
    uploadDate: '2025-01-08',
    size: '430 KB'
  },
];

// Document categories
const documentCategories = [
  { id: 'all', name: 'Tutti i documenti' },
  { id: 'contract', name: 'Contratti' },
  { id: 'identity', name: 'Documenti identità' },
  { id: 'medical', name: 'Certificati medici' },
  { id: 'permit', name: 'Permessi soggiorno' },
  { id: 'inps', name: 'Comunicazioni INPS' },
];

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  
  // Format date to Italian format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };
  
  // Filter documents based on search and category
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.employee.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || doc.type === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Get document icon based on type
  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'contract':
        return <FileText className="h-5 w-5 text-blue-800" />;
      case 'identity':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'medical':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'permit':
        return <FileText className="h-5 w-5 text-purple-600" />;
      case 'inps':
        return <FileText className="h-5 w-5 text-yellow-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };
  
  return (
    <div className="pb-16 md:pb-0"> {/* Add padding for mobile navbar */}
      {/* Header with search and upload button */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Cerca documenti..."
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
            onClick={() => setShowUploadModal(true)}
            className="flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
          >
            <Upload className="h-4 w-4 mr-2" />
            Carica documento
          </button>
        </div>
      </div>
      
      {/* Categories */}
      <div className="mb-6 overflow-x-auto">
        <div className="inline-flex space-x-2 pb-2">
          {documentCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category.id
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Documents list */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Folder className="h-5 w-5 mr-2 text-blue-800" />
            Documenti
          </h3>
          <span className="text-sm text-gray-500">
            {filteredDocuments.length} documenti
          </span>
        </div>
        
        {filteredDocuments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nome documento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Collaboratore
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data caricamento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dimensione
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {getDocumentIcon(document.type)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {document.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {document.employee || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(document.uploadDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {document.size}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-800 hover:text-blue-900 mr-3">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center">
            <FilePlus className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 mb-2">Nessun documento trovato</p>
            <p className="text-sm text-gray-400">
              {searchQuery ? 'Prova a modificare i criteri di ricerca' : 'Carica i tuoi primi documenti per gestirli facilmente'}
            </p>
          </div>
        )}
        
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
                  Visualizzando <span className="font-medium">1</span> a <span className="font-medium">{filteredDocuments.length}</span> di <span className="font-medium">{filteredDocuments.length}</span> risultati
                </p>
              </div>
              {filteredDocuments.length > 10 && (
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Precedente</span>
                      &laquo;
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-800 hover:bg-blue-100">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Successivo</span>
                      &raquo;
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setShowUploadModal(false)}></div>
          <div className="relative bg-white rounded-lg max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Carica nuovo documento</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                &times;
              </button>
            </div>
            
            <form className="p-6">
              <div className="mb-4">
                <label htmlFor="documentType" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo di documento
                </label>
                <select
                  id="documentType"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Seleziona tipo documento</option>
                  <option value="contract">Contratto</option>
                  <option value="identity">Documento identità</option>
                  <option value="medical">Certificato medico</option>
                  <option value="permit">Permesso soggiorno</option>
                  <option value="inps">Comunicazione INPS</option>
                  <option value="other">Altro</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-1">
                  Collaboratore associato (opzionale)
                </label>
                <select
                  id="employee"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="">Nessun collaboratore associato</option>
                  <option value="1">Maria Rossi</option>
                  <option value="2">Giuseppe Verdi</option>
                  <option value="3">Anna Bianchi</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="documentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome documento
                </label>
                <input
                  type="text"
                  id="documentName"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Nome documento"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-800 hover:text-blue-700"
                      >
                        <span>Carica un file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">o trascina qui</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, DOCX, JPG, PNG fino a 10MB
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
                >
                  Carica
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;