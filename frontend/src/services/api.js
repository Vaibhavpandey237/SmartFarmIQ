// API Service for Smart Farm IQ Frontend
import { processAndAnalyzeSoilImage } from './soilVisionService';
import { calculateCropRecommendations } from './soilRecommendationEngine';

const API_BASE = '';

/**
 * Authenticate user with username/email and password
 */
export async function loginUser(identifier, password) {
  const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identifier, password })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed. Please check your credentials.');
  }
  return data;
}

/**
 * Register a new user account
 */
export async function registerUser(userData) {
  const response = await fetch(`${API_BASE}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed.');
  }
  return data;
}

/**
 * Request password reset
 */
export async function resetPassword(email) {
  const response = await fetch(`${API_BASE}/api/v1/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Password reset request failed.');
  }
  return data;
}

/**
 * Upload leaf image for AI diagnosis
 */
export async function uploadDiagnosis(file) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/api/v1/diagnose`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error(`Diagnosis server error: ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetch past diagnosis history
 */
export async function fetchHistory() {
  const response = await fetch(`${API_BASE}/api/v1/history`);
  if (!response.ok) {
    throw new Error('Failed to fetch history');
  }
  return await response.json();
}

/**
 * Clear diagnosis history
 */
export async function clearHistory() {
  const response = await fetch(`${API_BASE}/api/v1/history`, {
    method: 'DELETE'
  });
  return response.ok;
}

// ==========================================
// SOILSENSE AI API METHODS
// ==========================================

/**
 * Upload soil image for AI soil classification
 */
export async function analyzeSoilImage(file) {
  // Always perform high-accuracy client-side optical computer vision directly on the canvas image
  const clientVisionResult = await processAndAnalyzeSoilImage(file);

  // Asynchronously notify backend for storage & audit without overriding real optical predictions
  try {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('soilGroup', clientVisionResult.predictedGroup);
    formData.append('confidence', clientVisionResult.confidencePct);
    fetch(`${API_BASE}/api/v1/soil/analyze`, {
      method: 'POST',
      body: formData
    }).catch(() => {});
  } catch (backendErr) {}

  return clientVisionResult;
}

/**
 * Get Smart Crop Recommendations
 */
export async function getSmartCropRecommendations(params) {
  try {
    const response = await fetch(`${API_BASE}/api/v1/soil/recommend`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (backendErr) {
    // Fall back to client-side recommendation engine
  }

  return calculateCropRecommendations(params);
}

/**
 * Fetch saved soil scan records
 */
export async function fetchSoilScanHistory() {
  try {
    const response = await fetch(`${API_BASE}/api/v1/soil/history`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) return data;
    }
  } catch (e) {
    // fallback to localStorage
  }

  try {
    const local = localStorage.getItem('plant_soil_history');
    return local ? JSON.parse(local) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Save a new soil scan record
 */
export async function saveSoilScanRecord(record) {
  try {
    const existing = await fetchSoilScanHistory();
    const updated = [record, ...existing.filter(r => r.id !== record.id)];
    localStorage.setItem('plant_soil_history', JSON.stringify(updated.slice(0, 30)));

    fetch(`${API_BASE}/api/v1/soil/history`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    }).catch(() => {});

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Clear soil scan history
 */
export async function clearSoilScanHistory() {
  localStorage.removeItem('plant_soil_history');
  try {
    await fetch(`${API_BASE}/api/v1/soil/history`, { method: 'DELETE' });
  } catch (e) {}
  return true;
}
