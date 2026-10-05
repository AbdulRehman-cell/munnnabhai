import React, { useState } from 'react';
import axios from 'axios';

export default function Book() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'Editorial Portrait',
    message: '',
    budgetRange: '$2,500 - $5,000',
    eventDate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const inquiryTypes = [
    'Editorial Portrait',
    'Architectural & Interior',
    'Fashion Campaign',
    'Commercial & Brand',
    'Private Event / Union',
    'Other Creative Endeavor'
  ];

  const budgetRanges = [
    'Under $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // POST the submission data as a client action to capture booking details
      await axios.post('/api/inquiries', {
        ...formData,
        status: 'Pending'
      });
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'Editorial Portrait',
        message: '',
        budgetRange: '$2,500 - $5,000',
        eventDate: '',
      });
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setSubmitError('An error occurred while saving your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundColor: '#111111',
      color: '#F4F4F0',
      minHeight: '100vh',
      fontFamily: 'var(--font-body, "Inter", sans-serif)',
      padding: '4rem 2rem 6rem 2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        backgroundColor: '#161616',
        borderRadius: '8px',
        border: '1px solid #2A2A2A',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        alignItems: 'stretch'
      }}>
        
        {/* Left Visual/Info Column */}
        <div style={{
          padding: '3rem 2.5rem',
          backgroundColor: '#0F0F0F',
          borderRight: '1px solid #2A2A2A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle Ambient Background Light representation */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle, rgba(163, 137, 89, 0.08) 0%, rgba(0,0,0,0) 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ position: 'relative', zIndex: 2 }}>
            <span style={{
              fontFamily: 'var(--font-body, "Inter", sans-serif)',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#A38959',
              display: 'block',
              marginBottom: '1rem'
            }}>
              Commission a Session
            </span>
            <h1 style={{
              fontFamily: 'var(--font-display, "Playfair Display", serif)',
              fontSize: '2.5rem',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#F4F4F0',
              margin: '0 0 1.5rem 0'
            }}>
              Lumière <br />
              Studio
            </h1>
            <p style={{
              fontSize: '0.95rem',
              lineHeight: 1.6,
              color: '#A0A0A0',
              marginBottom: '2rem'
            }}>
              We capture space, light, and personality with cinematic gravity and architectural discipline. Share the coordinates of your next project.
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#666', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Location</span>
              <span style={{ fontSize: '0.9rem', color: '#D0D0D0' }}>Austin, Texas & Worldwide</span>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', color: '#666', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Inquiries</span>
              <span style={{ fontSize: '0.9rem', color: '#A38959' }}>lumiere@studio-austin.com</span>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div style={{ padding: '3rem 2.5rem' }}>
          <h2 style={{
            fontFamily: 'var(--font-display, "Playfair Display", serif)',
            fontSize: '1.5rem',
            fontWeight: '400',
            color: '#F4F4F0',
            marginBottom: '1.5rem'
          }}>
            Inquire Details
          </h2>

          {submitSuccess ? (
            <div style={{
              backgroundColor: 'rgba(163, 137, 89, 0.1)',
              border: '1px solid #A38959',
              borderRadius: '6px',
              padding: '2rem',
              textAlign: 'center',
              marginTop: '2rem'
            }}>
              <h3 style={{
                fontFamily: 'var(--font-display, "Playfair Display", serif)',
                color: '#A38959',
                fontSize: '1.4rem',
                margin: '0 0 1rem 0'
              }}>
                Inquiry Logged
              </h3>
              <p style={{ color: '#D0D0D0', fontSize: '0.9rem', lineHeight: '1.5' }}>
                We appreciate your interest in our vision. Our studio will review your submission details and respond within 48 business hours with custom editorial suggestions.
              </p>
              <button
                onClick={() => setSubmitSuccess(false)}
                style={{
                  marginTop: '1.5rem',
                  background: 'transparent',
                  border: '1px solid #A38959',
                  color: '#A38959',
                  padding: '0.5rem 1.5rem',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#A38959';
                  e.currentTarget.style.color = '#111';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#A38959';
                }}
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Full Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0A0A0' }}>
                  Full Name <span style={{ color: '#A38959' }}>*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Julianne Vance"
                  style={{
                    backgroundColor: '#1C1C1C',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    padding: '0.75rem 1rem',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A38959'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>

              {/* Email & Phone Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0A0A0' }}>
                    Email <span style={{ color: '#A38959' }}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    style={{
                      backgroundColor: '#1C1C1C',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      padding: '0.75rem 1rem',
                      color: '#FFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#A38959'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0A0A0' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (512) 555-0199"
                    style={{
                      backgroundColor: '#1C1C1C',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      padding: '0.75rem 1rem',
                      color: '#FFF',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#A38959'}
                    onBlur={(e) => e.target.style.borderColor = '#333'}
                  />
                </div>
              </div>

              {/* Focus of Interest & Intended Budget Row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0A0A0' }}>
                    Inquiry Type
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    style={{
                      backgroundColor: '#1C1C1C',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      padding: '0.75rem 1rem',
                      color: '#FFF',
                      fontSize: '0.9rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {inquiryTypes.map((type) => (
                      <option key={type} value={type} style={{ backgroundColor: '#111' }}>{type}</option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0A0A0' }}>
                    Target Budget
                  </label>
                  <select
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    style={{
                      backgroundColor: '#1C1C1C',
                      border: '1px solid #333',
                      borderRadius: '4px',
                      padding: '0.75rem 1rem',
                      color: '#FFF',
                      fontSize: '0.9rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {budgetRanges.map((budget) => (
                      <option key={budget} value={budget} style={{ backgroundColor: '#111' }}>{budget}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Target Date */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0A0A0' }}>
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  style={{
                    backgroundColor: '#1C1C1C',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    padding: '0.75rem 1rem',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A38959'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>

              {/* Message / Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0A0A0' }}>
                  Vision Details & Timeline <span style={{ color: '#A38959' }}>*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe the mood, creative direction, venue or visual narrative parameters you wish to implement..."
                  style={{
                    backgroundColor: '#1C1C1C',
                    border: '1px solid #333',
                    borderRadius: '4px',
                    padding: '0.75rem 1rem',
                    color: '#FFF',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#A38959'}
                  onBlur={(e) => e.target.style.borderColor = '#333'}
                />
              </div>

              {submitError && (
                <div style={{ color: '#E06C75', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                  {submitError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#A38959',
                  color: '#111111',
                  border: 'none',
                  padding: '1rem',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  borderRadius: '4px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s ease, transform 0.1s ease',
                  marginTop: '1rem'
                }}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { if (!isSubmitting) e.currentTarget.style.opacity = '1'; }}
              >
                {isSubmitting ? 'Logging Inquiry...' : 'Submit Vision Brief'}
              </button>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}