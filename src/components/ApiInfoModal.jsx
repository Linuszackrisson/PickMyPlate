import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const ApiInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-secondary">Welcome to PickMyPlate!</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <p className="text-text mb-4">
          We use the free MealDB API to bring you delicious recipes. Please note:
        </p>
        <ul className="list-disc list-inside text-text mb-4">
          <li>Results may sometimes load slowly</li>
          <li>Occasionally, you might see repeated suggestions</li>
        </ul>
        <p className="text-text mb-4">
          We appreciate your patience and hope you enjoy discovering new meals!
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors duration-300"
        >
          Got it, let's explore!
        </button>
      </div>
    </div>
  );
};

export default ApiInfoModal;