import React, { createContext, useContext, useState, useEffect } from 'react';

const ContactContext = createContext();

export const useContact = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
};

export const ContactProvider = ({ children }) => {
  const [inquiries, setInquiries] = useState([]);

  // Load inquiries from localStorage
  useEffect(() => {
    const savedInquiries = localStorage.getItem('inquiries');
    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries));
    }
  }, []);

  // Save inquiries to localStorage
  useEffect(() => {
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const sendInquiry = (inquiryData) => {
    const newInquiry = {
      id: Date.now(),
      ...inquiryData,
      timestamp: new Date().toISOString(),
      status: 'new',
      read: false
    };
    
    setInquiries(prev => [newInquiry, ...prev]);
    return Promise.resolve(newInquiry);
  };

  const getAgentInquiries = (agentId) => {
    return inquiries.filter(inquiry => inquiry.agentId === agentId);
  };

  const markAsRead = (inquiryId) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId ? { ...inquiry, read: true } : inquiry
      )
    );
  };

  const updateInquiryStatus = (inquiryId, status) => {
    setInquiries(prev => 
      prev.map(inquiry => 
        inquiry.id === inquiryId ? { ...inquiry, status } : inquiry
      )
    );
  };

  const value = {
    inquiries,
    sendInquiry,
    getAgentInquiries,
    markAsRead,
    updateInquiryStatus
  };

  return (
    <ContactContext.Provider value={value}>
      {children}
    </ContactContext.Provider>
  );
};