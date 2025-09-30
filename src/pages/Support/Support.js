import React, { useState } from 'react';
import './Support.css';

const Support = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "How do I search for properties?",
      answer: "Use our search form on the home page or rentals page. You can filter by location, property type, price range, and other criteria to find exactly what you're looking for."
    },
    {
      question: "How do I contact a property owner?",
      answer: "Once you find a property you're interested in, click on 'View Details' and then use the contact form or provided contact information to reach out to the property owner or agent."
    },
    {
      question: "Is there a fee for using Rent Homes?",
      answer: "No, browsing properties and basic searches are completely free for tenants. Property owners pay a small fee when they successfully rent out their property through our platform."
    },
    {
      question: "How do I list my property?",
      answer: "Sign up for an agent account, then go to your dashboard and click 'Add Property'. Fill out the property details, upload photos, and publish your listing."
    },
    {
      question: "What areas do you cover?",
      answer: "We currently have properties listed across the United States and Europe, with new locations being added regularly."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <div className="support">
      <div className="container">
        <div className="support-header">
          <h1>Support Center</h1>
          <p>How can we help you today?</p>
        </div>
        
        <div className="support-content">
          <div className="support-options">
            <div className="support-card">
              <h3>📞 Call Support</h3>
              <p>+2547 03 726 130</p>
              <p>Available 24/7</p>
            </div>
            <div className="support-card">
              <h3>📧 Email Support</h3>
              <p>support@mtaaspace.com</p>
            </div>
          </div>
          
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button 
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <span className="faq-toggle">
                      {activeFAQ === index ? '−' : '+'}
                    </span>
                  </button>
                  {activeFAQ === index && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;