import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadTimers, saveTimers, loadHistory, saveHistory } from '../utils/storage';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [history, setHistory] = useState([]);
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [categories, setCategories] = useState(['Work', 'Personal', 'Study', 'Exercise']);

  // Load data on initial render
  useEffect(() => {
    const initializeData = async () => {
      const [loadedTimers, loadedHistory] = await Promise.all([
        loadTimers(),
        loadHistory()
      ]);
      if (loadedTimers) setTimers(loadedTimers);
      if (loadedHistory) setHistory(loadedHistory);
    };
    initializeData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    saveTimers(timers);
  }, [timers]);

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addTimer = (newTimer) => {
    setTimers(prev => [...prev, newTimer]);
  };

  const updateTimer = (id, updates) => {
    setTimers(prev => prev.map(timer => 
      timer.id === id ? { ...timer, ...updates } : timer
    ));
  };

  const addToHistory = (timer) => {
    const historyItem = {
      id: Date.now(),
      timerId: timer.id,
      name: timer.name,
      category: timer.category,
      duration: timer.duration,
      completedAt: new Date().toISOString()
    };
    setHistory(prev => [historyItem, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <TimerContext.Provider value={{
      timers,
      history,
      categories,
      activeTimerId,
      setActiveTimerId,
      addTimer,
      updateTimer,
      addToHistory,
      clearHistory
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimers = () => useContext(TimerContext);