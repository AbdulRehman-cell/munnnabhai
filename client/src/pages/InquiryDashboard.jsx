import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Badge, Button, Table, Spinner, PageHeader, toast, Alert } from '../components/ui/index';

export default function InquiryDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({ total: 0, new: 0, reviewed: 0, booked: 0 });

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inquiries');
      const data = response.data || [];
      setInquiries(data);

      // Calculate stats locally
      const counts = { total: data.length, new: 0, reviewed: 0, booked: 0 };
      data.forEach(item => {
        const status = (item.status || '').toLowerCase();
        if (status === 'new') counts.new++;
        else if (status === 'reviewed') counts.reviewed++;
        else if (status === 'booked') counts.booked++;
      });
      setStats(counts);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch lead inquiries. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/api/inquiries/${id}`, { status: newStatus });
      toast.success(`Inquiry updated to ${newStatus}`);
      fetchInquiries();
    } catch (err) {
      console.error(err);
      toast.error('Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to archive and permanently delete this visual lead?')) return;
    try {
      await axios.delete(`/api/inquiries/${id}`);
      toast.success('Inquiry archived');
      fetchInquiries();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete inquiry.');
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    if (filterStatus === 'all') return true;
    return (item.status || '').toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadgeVariant = (status) => {
    switch ((status || '').toLowerCase()) {
      case 'new': return 'warning';
      case 'reviewed': return 'neutral';
      case 'booked': return 'success';
      default: return 'primary';
    }
  };

  return (
    <div className="container" style={{ padding: '2rem var(--gutter)', maxWidth: 'var(--content-width)', margin: '0 auto' }}>
      {/* 1. COMPACT PAGE HERO */}
      <section className="section" style={{ padding: '2rem 0', borderBottom: '1px solid var(--border)' }}>
        <div className="section-head" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
          <span className="eyebrow" style={{ color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 600 }}>
            Lumière Control Deck
          </span>
          <h1 style={{ margin: '0.5rem 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Studio <span className="gradient-text" style={{ color: 'var(--primary)' }}>Inquiries</span> & Commissions
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: '600px', marginTop: '0.5rem' }}>
            Manage client visual profiles, scheduling logistics, architectural briefs, and commission budgets from the Hill Country.
          </p>
        </div>
      </section>

      {/* 2. STATS OVERVIEW SECTION */}
      <section className="section" style={{ padding: '2rem 0' }}>
        <div className="grid-4" style={{ display: 'grid', gap: '1.5rem', marginBottom: '2rem' }}>
          <Card variant="bordered" padding="md">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>Total Commissions</span>
              <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
                {stats.total}
              </span>
            </div>
          </Card>
          <Card variant="bordered" padding="md" style={{ borderLeft: '3px solid var(--accent)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>New Leads</span>
              <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
                {stats.new}
              </span>
            </div>
          </Card>
          <Card variant="bordered" padding="md" style={{ borderLeft: '3px solid var(--muted)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)' }}>Reviewed</span>
              <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--muted)', fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
                {stats.reviewed}
              </span>
            </div>
          </Card>
          <Card variant="bordered" padding="md" style={{ borderLeft: '3px solid var(--secondary)' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary)' }}>Booked Session Rates</span>
              <span style={{ fontSize: '2rem', fontWeight: 600, color: 'var(--secondary)', fontFamily: 'var(--font-display)', marginTop: '0.5rem' }}>
                {stats.booked}
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* 3. DYNAMIC TABLE & ACTIONS LIST SECTION */}
      <section className="section" style={{ padding: '2rem 0' }}>
        {error && (
          <Alert variant="error" title="Synchronization Error" style={{ marginBottom: '1.5rem' }}>
            {error}
          </Alert>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Custom Filter Bar with styling matching design motif */}
          <div className="filter-bar" style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
            {['all', 'new', 'reviewed', 'booked'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  background: filterStatus === status ? 'var(--surface-2)' : 'transparent',
                  color: filterStatus === status ? 'var(--primary)' : 'var(--muted)',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  fontWeight: filterStatus === status ? '600' : '400',
                  transition: 'all 0.2s ease',
                  borderBottom: filterStatus === status ? '2px solid var(--primary)' : '2px solid transparent'
                }}
              >
                {status} ({status === 'all' ? inquiries.length : inquiries.filter(i => (i.status || '').toLowerCase() === status).length})
              </button>
            ))}
          </div>

          <Button variant="secondary" onClick={fetchInquiries}>
            Refresh Leads
          </Button>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0' }}>
            <Spinner size="lg" color="primary" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <Card variant="bordered" padding="lg" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🌿</span>
            <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>No Inquiries Captured</h3>
            <p style={{ color: 'var(--muted)', maxWidth: '400px', margin: '0 auto' }}>
              There are currently no active commissioning requests for this status filter.
            </p>
          </Card>
        ) : (
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th style={{ color: 'var(--muted)' }}>Client</Table.Th>
                <Table.Th style={{ color: 'var(--muted)' }}>Project Type</Table.Th>
                <Table.Th style={{ color: 'var(--muted)' }}>Budget</Table.Th>
                <Table.Th style={{ color: 'var(--muted)' }}>Project Date</Table.Th>
                <Table.Th style={{ color: 'var(--muted)' }}>Status</Table.Th>
                <Table.Th style={{ color: 'var(--muted)', textAlign: 'right' }}>Actions</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {filteredInquiries.map((inquiry) => (
                <Table.Row key={inquiry._id}>
                  <Table.Td>
                    <div>
                      <strong style={{ color: 'var(--text)', display: 'block' }}>{inquiry.fullName || 'Anonymous Client'}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'block' }}>{inquiry.email}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'block' }}>{inquiry.phone || 'No phone'}</span>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>
                      {inquiry.inquiryType || 'General inquiry'}
                    </span>
                  </Table.Td>
                  <Table.Td>
                    <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{inquiry.budgetRange || 'Flexible'}</span>
                  </Table.Td>
                  <Table.Td>
                    {inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : 'TBD'}
                  </Table.Td>
                  <Table.Td>
                    <Badge variant={getStatusBadgeVariant(inquiry.status)}>{inquiry.status || 'New'}</Badge>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                      <select
                        value={inquiry.status || 'new'}
                        onChange={(e) => handleUpdateStatus(inquiry._id, e.target.value)}
                        style={{
                          padding: '0.25rem 0.5rem',
                          fontSize: '0.8rem',
                          border: '1px solid var(--border)',
                          borderRadius: '4px',
                          background: 'var(--surface-2)',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="booked">Booked</option>
                      </select>
                      <Button variant="ghost" onClick={() => handleDelete(inquiry._id)}>
                        Archive
                      </Button>
                    </div>
                  </Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </section>

      {/* 4. BEHIND THE SCENES DETAIL VIEW CARD */}
      <section className="section" style={{ padding: '2rem 0', borderTop: '1px solid var(--border)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem' }}>Creative Outlines & Briefs</h2>
        <div className="grid-2" style={{ display: 'grid', gap: '2rem' }}>
          {filteredInquiries.slice(0, 4).map((inquiry) => (
            <div 
              key={inquiry._id} 
              style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '1.5rem',
                backgroundColor: 'var(--surface)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>{inquiry.fullName}</span>
                <span style={{ fontSize: '0.75rem', background: 'var(--surface-2)', padding: '2px 8px', borderRadius: '4px' }}>
                  {inquiry.inquiryType}
                </span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text)', fontStyle: 'italic', margin: '0 0 1rem 0' }}>
                "{inquiry.message || 'No additional creative brief provided.'}"
              </p>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                Sent: {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'Recently'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}