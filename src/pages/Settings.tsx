import React, { useState } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, HelpCircle, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // User profile state
  const [name, setName] = useState('Mario Rossi');
  const [email, setEmail] = useState('mario.rossi@example.com');
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [payslipReminders, setPayslipReminders] = useState(true);
  const [contributionReminders, setContributionReminders] = useState(true);
  const [documentReminders, setDocumentReminders] = useState(false);
  
  return (
    <div className="pb-16 md:pb-0"> {/* Add padding for mobile navbar */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <SettingsIcon className="h-5 w-5 mr-2 text-blue-800" />
            Impostazioni
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Sidebar */}
          <div className="border-r border-gray-200 bg-gray-50 p-4">
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'profile'
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User className="mr-3 h-5 w-5" />
                Profilo
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'notifications'
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Bell className="mr-3 h-5 w-5" />
                Notifiche
              </button>
              <button
                onClick={() => setActiveTab('privacy')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'privacy'
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Shield className="mr-3 h-5 w-5" />
                Privacy e sicurezza
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'help'
                    ? 'bg-blue-50 text-blue-800'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HelpCircle className="mr-3 h-5 w-5" />
                Aiuto e supporto
              </button>
            </nav>
          </div>
          
          {/* Main content */}
          <div className="p-6 col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Profilo utente</h2>
                
                <form className="space-y-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Cambia password</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                          Password attuale
                        </label>
                        <input
                          type="password"
                          id="current-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div className="hidden md:block">
                        {/* Spacer on larger screens */}
                      </div>
                      
                      <div>
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                          Nuova password
                        </label>
                        <input
                          type="password"
                          id="new-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                          Conferma nuova password
                        </label>
                        <input
                          type="password"
                          id="confirm-password"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salva modifiche
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Impostazioni notifiche</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Email</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="email-notifications"
                          type="checkbox"
                          checked={emailNotifications}
                          onChange={(e) => setEmailNotifications(e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                          Ricevi notifiche via email
                        </label>
                      </div>
                      
                      <div className="pl-6 space-y-4">
                        <div className="flex items-center">
                          <input
                            id="payslip-reminders"
                            type="checkbox"
                            checked={payslipReminders}
                            onChange={(e) => setPayslipReminders(e.target.checked)}
                            disabled={!emailNotifications}
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                              !emailNotifications ? 'opacity-50' : ''
                            }`}
                          />
                          <label 
                            htmlFor="payslip-reminders" 
                            className={`ml-2 block text-sm ${
                              !emailNotifications ? 'text-gray-400' : 'text-gray-900'
                            }`}
                          >
                            Promemoria mensili per generazione cedolini
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="contribution-reminders"
                            type="checkbox"
                            checked={contributionReminders}
                            onChange={(e) => setContributionReminders(e.target.checked)}
                            disabled={!emailNotifications}
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                              !emailNotifications ? 'opacity-50' : ''
                            }`}
                          />
                          <label 
                            htmlFor="contribution-reminders" 
                            className={`ml-2 block text-sm ${
                              !emailNotifications ? 'text-gray-400' : 'text-gray-900'
                            }`}
                          >
                            Notifiche scadenze contributi INPS
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="document-reminders"
                            type="checkbox"
                            checked={documentReminders}
                            onChange={(e) => setDocumentReminders(e.target.checked)}
                            disabled={!emailNotifications}
                            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
                              !emailNotifications ? 'opacity-50' : ''
                            }`}
                          />
                          <label 
                            htmlFor="document-reminders" 
                            className={`ml-2 block text-sm ${
                              !emailNotifications ? 'text-gray-400' : 'text-gray-900'
                            }`}
                          >
                            Notifiche documenti in scadenza (es. permessi soggiorno)
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Frequenza notifiche</h3>
                    
                    <div className="max-w-xs">
                      <select
                        id="notification-frequency"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="immediately">Immediata</option>
                        <option value="daily">Riassunto giornaliero</option>
                        <option value="weekly">Riassunto settimanale</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salva impostazioni
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Privacy Tab */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Privacy e sicurezza</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Sicurezza account</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="two-factor"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="two-factor" className="ml-2 block text-sm text-gray-900">
                          Attiva autenticazione a due fattori (2FA)
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          id="session-timeout"
                          type="checkbox"
                          defaultChecked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="session-timeout" className="ml-2 block text-sm text-gray-900">
                          Disconnetti automaticamente dopo 30 minuti di inattività
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Privacy dati</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="data-policy"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-2 text-sm">
                          <label htmlFor="data-policy" className="font-medium text-gray-900">
                            Privacy policy
                          </label>
                          <p className="text-gray-500">
                            Ho letto e accettato la <a href="#" className="text-blue-800 hover:text-blue-700">privacy policy</a> e i termini di utilizzo del servizio.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="marketing"
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-2 text-sm">
                          <label htmlFor="marketing" className="font-medium text-gray-900">
                            Comunicazioni di marketing
                          </label>
                          <p className="text-gray-500">
                            Desidero ricevere email su aggiornamenti del servizio e nuove funzionalità.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-2">Gestione dati</h3>
                    
                    <div className="space-y-4">
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Esporta tutti i dati
                      </button>
                      
                      <button
                        type="button"
                        className="px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50"
                      >
                        Elimina account
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900 flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Salva impostazioni
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Help Tab */}
            {activeTab === 'help' && (
              <div>
                <h2 className="text-xl font-medium text-gray-900 mb-4">Aiuto e supporto</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">FAQ</h3>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-1">Come si genera un cedolino mensile?</h4>
                        <p className="text-sm text-gray-600">
                          Per generare un cedolino mensile, vai alla sezione "Cedolini", seleziona il collaboratore e il mese di riferimento, inserisci le ore lavorate e gli eventuali straordinari o assenze, quindi clicca su "Genera anteprima" e successivamente su "Genera PDF".
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-1">Come si calcolano i contributi INPS?</h4>
                        <p className="text-sm text-gray-600">
                          I contributi INPS vengono calcolati automaticamente su base trimestrale. Vai alla sezione "Contributi INPS", verifica i dati relativi al trimestre corrente e clicca su "Genera MAV INPS" per ottenere i dati di pagamento.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium text-gray-900 mb-1">Come si aggiunge un nuovo collaboratore?</h4>
                        <p className="text-sm text-gray-600">
                          Per aggiungere un nuovo collaboratore, vai alla sezione "Collaboratori" e clicca sul pulsante "Nuovo collaboratore". Compila tutti i campi richiesti come nome, ruolo, livello CCNL, data di assunzione e ore settimanali.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <a href="#" className="text-blue-800 hover:text-blue-700 text-sm font-medium">
                        Visualizza tutte le FAQ →
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Contatta il supporto</h3>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600 mb-4">
                        Hai domande o problemi? Il nostro team di supporto è disponibile dal lunedì al venerdì, dalle 9:00 alle 18:00.
                      </p>
                      
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Email:</span> <a href="mailto:supporto@colfmanager.it" className="text-blue-800 hover:text-blue-700">supporto@colfmanager.it</a>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Telefono:</span> <a href="tel:+390123456789" className="text-blue-800 hover:text-blue-700">+39 01 2345 6789</a>
                        </p>
                      </div>
                      
                      <div className="mt-4">
                        <button
                          type="button"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-800 hover:bg-blue-900"
                        >
                          Apri ticket di supporto
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-3">Risorse utili</h3>
                    
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="#" className="text-blue-800 hover:text-blue-700">
                          Guida completa all'utilizzo
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-800 hover:text-blue-700">
                          CCNL Lavoro domestico aggiornato
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-800 hover:text-blue-700">
                          Tabelle retributive INPS
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-800 hover:text-blue-700">
                          Normativa TFR per collaboratori domestici
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-blue-800 hover:text-blue-700">
                          Video tutorial
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;