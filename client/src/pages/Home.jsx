import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        setLoading(true);
        const response = await axios.get('/api/projects');
        // Filter featured projects, fallback to first 4 if none marked featured
        const projects = response.data || [];
        const featured = projects.filter(p => p.featured);
        if (featured.length > 0) {
          setFeaturedProjects(featured.slice(0, 4));
        } else {
          setFeaturedProjects(projects.slice(0, 4));
        }
        setError(null);
      } catch (err) {
        console.error('Error loading featured projects:', err);
        // Fallback placeholder data if API isn't populated yet
        setFeaturedProjects([
          {
            _id: 'sample-1',
            title: 'Chamberlain Residence',
            category: 'Architectural',
            location: 'Austin, TX',
            imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
            description: 'A study on light and brutalist volumes.'
          },
          {
            _id: 'sample-2',
            title: 'Sartorial Silence',
            category: 'Editorial',
            location: 'Westlake, TX',
            imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
            description: 'Minimalist campaign captures for modern linen.'
          },
          {
            _id: 'sample-3',
            title: 'The Alchemist',
            category: 'Portrait',
            location: 'Austin, TX',
            imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
            description: 'Deep contrast profiling of local visionaries.'
          },
          {
            _id: 'sample-4',
            title: 'Verdant Pavilions',
            category: 'Architectural',
            location: 'Hill Country, TX',
            imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
            description: 'Indoor-outdoor integration under direct Texas sun.'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="home-page-wrapper">
      {/* 1. HERO SECTION (Full-bleed design) */}
      <section className="hero">
        <img 
          className="hero-bg" 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80" 
          alt="Cinematic architectural space illuminated by afternoon sun" 
        />
        <div className="container">
          <span className="eyebrow">LUMIÈRE STUDIO — AUSTIN, TEXAS</span>
          <h1>Honoring light, shadow, and <span className="gradient-text">humanity</span></h1>
          <p className="hero-subtitle">
            An intentional, warm-editorial photography studio documenting architecture, elevated portraits, and curated editorial campaigns with high-contrast cinematic discipline.
          </p>
          <div className="hero-actions">
            <Link to="/portfolio" className="btn-primary">Explore Portfolio</Link>
            <Link to="/book" className="btn-secondary">Inquire Now</Link>
          </div>
        </div>
      </section>

      {/* 2. STATS & CLIENT INTRO SECTION */}
      <section className="section text-center">
        <div className="container">
          <div className="stats">
            <div className="stat-card">
              <span className="stat-value">12+</span>
              <span className="stat-label">Years of Visual Craft</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">140+</span>
              <span className="stat-label">Published Editorials</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">100%</span>
              <span className="stat-label">Analog & Digital Integrity</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">04+</span>
              <span className="stat-label">Global Design Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE STUDIO PHILOSOPHY (Feature Split Grid) */}
      <section className="section alternative-bg">
        <div className="container">
          <div className="grid grid-2">
            <div className="column-content">
              <span className="eyebrow">OUR ETHOS</span>
              <h2>A quiet reverence for natural illumination</h2>
              <p className="lead-text">
                We believe that the most compelling narratives are captured where shadow and light collide. Rather than over-lighting, we sculpt with existing ambient texture to preserve the authenticity of a space or a face.
              </p>
              <p>
                From residential monolithic concrete structures in Austin's Hill Country to raw editorial portraiture for independent founders, our lens is consistently devoted to texture, grain, and genuine human warmth.
              </p>
              <div className="button-group" style={{ marginTop: '2rem' }}>
                <Link to="/book" className="btn-primary">Collaborate With Us</Link>
              </div>
            </div>
            <div className="column-image">
              <div className="gallery-item" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80" 
                  alt="Photographer holding medium format camera" 
                  style={{ width: '100%', height: '450px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURATED WORK / FEATURED PORTFOLIO */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">CURATED EDITORIALS</span>
            <h2>Recent Studio Work</h2>
            <p className="section-subtitle">
              A precise selection of editorial, architectural, and fine art commissions captured in central Texas and beyond.
            </p>
          </div>

          {loading ? (
            <div className="text-center" style={{ padding: '3rem' }}>
              <span className="spinner">Loading showcase...</span>
            </div>
          ) : (
            <div className="grid grid-2">
              {featuredProjects.map((project) => (
                <div key={project._id} className="card animate-in" style={{ padding: 0, overflow: 'hidden' }}>
                  <div className="gallery-item" style={{ position: 'relative', overflow: 'hidden', height: '380px' }}>
                    <img 
                      src={project.imageUrl || 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=600&q=80'} 
                      alt={project.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    />
                    <div className="gallery-overlay" style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                      padding: '1.5rem',
                      color: 'var(--white)'
                    }}>
                      <span className="badge" style={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                        {project.category || 'General'}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{project.title}</h3>
                      <span className="location-tag" style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{project.location || 'Austin, TX'}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', margin: 0 }}>
                      {project.description || 'No description provided.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/portfolio" className="btn-secondary">View Entire Archive ({featuredProjects.length}+ Works)</Link>
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE & METHODOLOGY (How it Works / Step Row) */}
      <section className="section alternative-bg">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow">THE CAPTURE JOURNEY</span>
            <h2>Our Deliberate Creative Process</h2>
            <p className="section-subtitle">
              Every project is an artisanal partnership. We reject fast-paced mass production in favor of curated depth and deliberate preparation.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="step-card" style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <span className="step-num" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: 'var(--primary)', display: 'block', marginBottom: '1rem', opacity: 0.8 }}>01</span>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>Sartorial Consult</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                We begin with dialogue. We discuss physical light direction, natural color palettes, spatial textures, and the overall emotional architecture of your creative vision.
              </p>
            </div>

            <div className="step-card" style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <span className="step-num" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: 'var(--primary)', display: 'block', marginBottom: '1rem', opacity: 0.8 }}>02</span>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>The Sculpting Session</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Using high-end digital sensors alongside analog medium-format film, we patiently construct setups. We observe how the true physical elements interact without synthetic rush.
              </p>
            </div>

            <div className="step-card" style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: 'var(--radius-md)' }}>
              <span className="step-num" style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', color: 'var(--primary)', display: 'block', marginBottom: '1rem', opacity: 0.8 }}>03</span>
              <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>The Editorial Finish</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)' }}>
                Every single deliverable is hand-finished with meticulous attention to natural skin tones, deep silver-black levels, and delicate, high-fidelity film grain preservation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIAL VIDEO EMBED & PRAISE */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="eyebrow">MOVING IMAGES</span>
              <h2>Visual Harmony & Tone</h2>
              <p className="lead-text">
                Watch Lumière Studio behind the scenes as we shape natural shadows and capture cinematic stories in Austin's distinct warm sunlight.
              </p>
              <div className="testimonial" style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1.5rem', margin: '2rem 0' }}>
                <p style={{ fontStyle: 'italic', fontSize: '1.1rem' }}>
                  "Lumière completely changed how we showcase our architecture. They didn't just photograph the house—they captured the entire mood of the wind and sun moving through the concrete arches."
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img className="avatar" src="https://i.pravatar.cc/300?img=33" alt="Marcus Vance" style={{ width: '48px', height: '48px' }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Marcus Vance</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Principal Architect, Vance Design</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="video-embed" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                  title="Lumière Studio Behind the Scenes Showcase" 
                  allowFullScreen
                  style={{ border: 'none', width: '100%', height: '350px' }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION BLOCK */}
      <section className="section">
        <div className="container">
          <div className="cta-section text-center" style={{ padding: '5rem 2rem', borderRadius: 'var(--radius-lg)' }}>
            <span className="eyebrow" style={{ color: 'rgba(255, 255, 255, 0.85)' }}>LET'S COMMENCE THE PROJECT</span>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--white)', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
              Ready to capture your perspective?
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
              Whether you are an architect showcasing a new commission, an agency launching a luxury brand campaign, or an individual seeking a permanent portrait, let's craft something timeless.
            </p>
            <div className="hero-actions" style={{ justifyContent: 'center' }}>
              <Link to="/book" className="btn-primary" style={{ background: 'var(--white)', color: 'var(--text)' }}>
                Initiate Creative Booking
              </Link>
              <Link to="/portfolio" className="btn-secondary" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'var(--white)' }}>
                Browse Full Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="footer" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', padding: '5rem 0' }}>
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', letterSpacing: '0.05em' }}>LUMIÈRE STUDIO</h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '1rem' }}>
                Editorial & architectural photography. <br />
                Established with reverence in Austin, Texas.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Studio Hours</h4>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                By appointment only.<br />
                Monday — Friday: 9:00 AM – 6:00 PM CST<br />
                Austin, Texas & Available for travel.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><Link to="/" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '0.9rem' }}>Home</Link></li>
                <li><Link to="/portfolio" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '0.9rem' }}>Our Work</Link></li>
                <li><Link to="/book" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '0.9rem' }}>Book / Inquire</Link></li>
                <li><Link to="/admin/inquiries" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.85rem' }}>Admin Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '4rem', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              © {new Date().getFullYear()} Lumière Studio LLC. All rights reserved.
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
              Warm-Editorial Photography, Austin TX
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}