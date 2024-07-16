'use client'
import { DEFAULT_MODELS } from '@/lib/constants';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface StateContextType {
  enabledModels: string[];
  selectedModel?: string;
  setEnabledModels: (value: string[]) => void;
  setSelectedModel: (value?: string) => void;
  changeModelStatus: (name: string, checked: boolean) => void;
  openAIKey: string;
  setOpenAIKey: (value: string) => void;
  clearData: () => void;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const ModelStorageProvider = ({ children }: { children: ReactNode }) => {
  const [enabledModels, setEnabledModels] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>();
  const [openAIKey, saveOpenAIKey] = useState("");

  useEffect(() => {
    let models = localStorage.getItem('openai-models')?.split(',') ?? [];
    /* Ensure at least default models enables */
    if (models.length === 0) {
      models = DEFAULT_MODELS;
      localStorage.setItem('openai-models', DEFAULT_MODELS.join(','));
    }
    setEnabledModels(models);
    setOpenAIKey(localStorage.getItem('openai-key') ?? '');

    /* Load the selected model */
    let modelValue = localStorage.getItem('selected-model');
    if (!modelValue) {
      modelValue = models[0];
      localStorage.setItem('selected-model', modelValue);
    }
    setSelectedModel(modelValue ?? '');
  }, []);

  /**
   * Change the stored model status
   * @param name 
   * @param checked 
   */
  const changeModelStatus = (name: string, checked: boolean) => {
    const idxModel = enabledModels.indexOf(name);
    if (checked && idxModel < 0) {
      const newModels = [...enabledModels, name];
      setEnabledModels(newModels);
      localStorage.setItem('openai-models', newModels.join(','));
    } else if (!checked && idxModel >= 0) {
      const newModels = enabledModels.filter((model) => model !== name);
      setEnabledModels(newModels);
      localStorage.setItem('openai-models', newModels.join(','));
    }
  };

  /**
   * Set and save the OpenAI key
   * @param key 
   */
  const setOpenAIKey = (key: string) => {
    saveOpenAIKey(key);
    localStorage.setItem('openai-key', key);
  };

  /**
   * Clear the OpenAI key and models
   */
  const clearData = () => {
    localStorage.setItem('openai-models', DEFAULT_MODELS.join(','));
    setOpenAIKey('');
    setEnabledModels(DEFAULT_MODELS);
  };

  return (
    <StateContext.Provider value={{ enabledModels, setEnabledModels, openAIKey, setOpenAIKey, changeModelStatus, clearData, selectedModel, setSelectedModel }}>
      {children}
    </StateContext.Provider>
  );
};

export const useModelStorageContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error('Context not ready');
  }
  return context;
};
