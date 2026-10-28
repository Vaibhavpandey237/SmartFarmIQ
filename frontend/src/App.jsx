import React, { useState, useEffect } from 'react';
import AuthPortal from './components/auth/AuthPortal';
import Navbar from './components/common/Navbar';
import WeatherBanner from './components/common/WeatherBanner';
import NavigationTabs from './components/common/NavigationTabs';
import DashboardView from './components/dashboard/DashboardView';
import DiagnosisView from './components/diagnosis/DiagnosisView';
import SoilSenseView from './components/soilsense/SoilSenseView';
import ProductsStoreView from './components/products/ProductsStoreView';
import CropPricesView from './components/prices/CropPricesView';
import GardenView from './components/garden/GardenView';
import AddPlantModal from './components/garden/AddPlantModal';
import RemindersView from './components/garden/RemindersView';
import BotanistChatView from './components/assistant/BotanistChatView';
import HistoryTrendView from './components/history/HistoryTrendView';
import AdminPanelView from './components/admin/AdminPanelView';
import InstallAppModal from './components/common/InstallAppModal';
import Esp32CamModal from './components/common/Esp32CamModal';

import { 
  INITIAL_PLANT_PROFILES, 
  INITIAL_REMINDERS, 
  WEATHER_FORECAST 
} from './data/initialPlants';
import { fetchHistory as apiFetchHistory } from './services/api';

export default function App() {
  // Theme State
  const [theme, setTheme] = useState(localStorage.getItem('plant_theme') || 'dark');

  // Auth State
  // Auth State (Defaults to Demo Farmer to prevent any blank screen or login lockout)
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('plant_user');
      const savedToken = localStorage.getItem('plant_token');
      if (savedUser && savedToken) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch (e) {}

    // Safe default demo farmer user
    const defaultUser = {
      name: 'Farmer Vaibhav',
      username: 'farmer_vaibhav',
      email: 'farmer@smartfarmiq.ai',
      role: 'USER'
    };
    try {
      localStorage.setItem('plant_user', JSON.stringify(defaultUser));
      localStorage.setItem('plant_token', 'demo_token_auto');
    } catch (e) {}
    return defaultUser;
  });

  // Navigation State with URL param/hash support and localStorage persistence
  const [activeTab, setActiveTab] = useState(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      if (tabParam) return tabParam;
      const hash = window.location.hash.replace('#', '');
      if (hash) return hash;
      return localStorage.getItem('plant_active_tab') || 'soilsense';
    } catch (e) {
      return 'soilsense';
    }
  });
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // App Data State
  const [history, setHistory] = useState([]);
  const [plantProfiles, setPlantProfiles] = useState(INITIAL_PLANT_PROFILES);
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);
  const [showAddPlantModal, setShowAddPlantModal] = useState(false);
  const [showEsp32CamModal, setShowEsp32CamModal] = useState(false);
  const [lastDiagnosisResult, setLastDiagnosisResult] = useState(null);
  const [pendingDiagnosisFile, setPendingDiagnosisFile] = useState(null);

  const handleSwitchToDiagnosis = (file) => {
    setPendingDiagnosisFile(file || null);
    handleTabClick('diagnose');
  };

  const handleEsp32CaptureForDiagnosis = (file) => {
    setPendingDiagnosisFile(file);
    handleTabClick('diagnose');
  };

  const handleEsp32CaptureForSoil = (file) => {
    handleTabClick('soilsense');
  };

  // PWA Install State
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  // Listen for PWA beforeinstallprompt event
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsAppInstalled(true);
    }

    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', () => {
      setIsAppInstalled(true);
      setInstallPrompt(null);
      setShowInstallModal(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleNativeInstall = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          setInstallPrompt(null);
          setShowInstallModal(false);
        }
      } catch (err) {
        console.warn('PWA Install Prompt error:', err);
      }
    }
  };

  // Listen for hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) setActiveTab(hash);
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Sync Theme with DOM
  useEffect(() => {
    document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
    localStorage.setItem('plant_theme', theme);
  }, [theme]);

  // Fetch History on Auth
  useEffect(() => {
    if (user) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    try {
      const data = await apiFetchHistory();
      setHistory(data || []);
    } catch (e) {
      // Keep empty or default history if offline
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    try {
      localStorage.setItem('plant_active_tab', tabId);
      window.location.hash = tabId;
    } catch (e) {}
    setMoreDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('plant_token');
    localStorage.removeItem('plant_user');
  };

  const handleAddPlant = (newPlant) => {
    const createdPlant = {
      id: Date.now(),
      name: newPlant.name,
      species: newPlant.species,
      room: 'Main Room',
      healthScore: 95,
      lastWatered: 'Just now',
      status: 'Healthy'
    };
    setPlantProfiles([createdPlant, ...plantProfiles]);
  };

  const handleMarkReminderDone = (reminderId) => {
    setReminders(reminders.filter(r => r.id !== reminderId));
  };

  // 🔒 STRICT LOGIN PORTAL
  if (!user) {
    return <AuthPortal onLoginSuccess={(loggedInUser) => { setUser(loggedInUser); setActiveTab('dashboard'); }} />;
  }

  // 🔓 AUTHENTICATED APPLICATION
  return (
    <div className="app-container">
      {/* Header Navbar */}
      <Navbar
        user={user}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
        onTabClick={handleTabClick}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        hasResult={!!lastDiagnosisResult}
        onOpenInstallModal={() => setShowInstallModal(true)}
      />

      {/* Navigation Tab Bar & Drawers */}
      <NavigationTabs
        activeTab={activeTab}
        onTabClick={handleTabClick}
        user={user}
        gardenCount={plantProfiles.length}
        remindersCount={reminders.length}
        moreDropdownOpen={moreDropdownOpen}
        setMoreDropdownOpen={setMoreDropdownOpen}
        mobileMenuOpen={mobileMenuOpen}
        onOpenInstallModal={() => setShowInstallModal(true)}
      />

      {/* Weather Forecast Banner */}
      <WeatherBanner weatherRisk={WEATHER_FORECAST} />

      {/* TAB VIEWS */}
      {activeTab === 'dashboard' && (
        <DashboardView
          user={user}
          history={history}
          plantProfiles={plantProfiles}
          reminders={reminders}
          onTabClick={handleTabClick}
          onOpenAddPlant={() => setShowAddPlantModal(true)}
          onOpenInstallModal={() => setShowInstallModal(true)}
          onOpenEsp32Cam={() => setShowEsp32CamModal(true)}
        />
      )}

      {activeTab === 'diagnose' && (
        <DiagnosisView 
          onDiagnosisComplete={(res) => {
            setLastDiagnosisResult(res);
            loadHistory();
          }} 
          initialFile={pendingDiagnosisFile}
          onClearInitialFile={() => setPendingDiagnosisFile(null)}
          onOpenEsp32Cam={() => setShowEsp32CamModal(true)}
        />
      )}

      {activeTab === 'soilsense' && (
        <SoilSenseView 
          user={user} 
          onTabClick={handleTabClick}
          onSwitchToDiagnosis={handleSwitchToDiagnosis}
        />
      )}

      {activeTab === 'store' && <ProductsStoreView />}

      {activeTab === 'cropprices' && <CropPricesView />}

      {activeTab === 'garden' && (
        <GardenView 
          plantProfiles={plantProfiles} 
          onOpenAddPlant={() => setShowAddPlantModal(true)} 
        />
      )}

      {activeTab === 'reminders' && (
        <RemindersView 
          reminders={reminders} 
          onMarkDone={handleMarkReminderDone} 
        />
      )}

      {activeTab === 'chat' && <BotanistChatView />}

      {activeTab === 'history' && <HistoryTrendView history={history} />}

      {activeTab === 'admin' && <AdminPanelView />}

      {/* Add Plant Modal */}
      <AddPlantModal
        isOpen={showAddPlantModal}
        onClose={() => setShowAddPlantModal(false)}
        onAddPlant={handleAddPlant}
      />

      {/* PWA App Download & Install Modal */}
      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onInstallClick={handleNativeInstall}
        hasNativePrompt={!!installPrompt}
      />

      {/* ESP32-CAM IoT Live Modal */}
      <Esp32CamModal
        isOpen={showEsp32CamModal}
        onClose={() => setShowEsp32CamModal(false)}
        onCaptureForDiagnosis={handleEsp32CaptureForDiagnosis}
        onCaptureForSoil={handleEsp32CaptureForSoil}
      />
    </div>
  );
}
