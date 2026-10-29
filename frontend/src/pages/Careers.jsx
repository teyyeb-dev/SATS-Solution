import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ParticleNetwork from '../components/ParticleNetwork';
import SEO from '../components/SEO';

const Careers = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .reveal-pic').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content">
      <SEO
        title="Careers | Join the Elite AI Team"
        description="We are recruiting the top 1% of engineering talent. Work on complex global AI challenges with graduates from Yale and UPenn."
        keywords="AI Careers, Software Engineer Jobs, Machine Learning Engineering Roles, SATS Solutions Careers"
      />
      {/* ═══ HERO ═══ */}
      <header className="careers-hero" style={{ position: 'relative', color: '#fff', padding: '120px 0 80px', textAlign: 'center', overflow: 'hidden' }}>
        <ParticleNetwork />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9))', zIndex: 1 }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-label reveal" style={{ color: 'var(--brand-primary-soft)' }}>Elite Engineering Careers</div>
          <h1 className="section-heading reveal" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>Build the <em>Infrastructure</em> of Tomorrow.</h1>
          <p className="section-sub reveal" style={{ color: 'rgba(255,255,255,0.8)', margin: '0 auto', maxWidth: '700px' }}>We are curating a league of extraordinary engineers from USA America's premier Ivy League and technical institutions to architect the future of global enterprise AI.</p>
          <div className="reveal" style={{ marginTop: '40px', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#positions" className="btn btn--primary">View Open Roles</a>
            <a href="#culture" className="btn btn--outline" style={{ color: 'var(--brand-primary)', background: 'rgba(var(--brand-primary-rgb), 0.16)' }}>Our Culture</a>
          </div>
        </div>
      </header>

      {/* ═══ CULTURE SECTION ═══ */}
      <section id="culture" style={{padding: '100px 0'}}>
        <div className="container">
          <div style={{textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px'}}>
            <div className="section-label" style={{justifyContent: 'center'}}>Ecosystem Culture</div>
            <h2 className="section-heading">Innovation in <em>Every</em> Dimension.</h2>
            <p className="section-sub" style={{margin: '0 auto'}}>Transcending technical execution, SATS represents an elite collective of academic laureates and visionary problem solvers.</p>
          </div>

          <div className="culture-grid reveal-stagger">
            <div className="culture-img reveal-pic" style={{height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}><img src="/assets/images/career-1.jpg" alt="Team Work" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
            <div className="culture-img reveal-pic" style={{height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}><img src="/assets/images/career-2.jpg" alt="Office Collaboration" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
            <div className="culture-img reveal-pic" style={{height: '300px', borderRadius: 'var(--radius-lg)', overflow: 'hidden'}}><img src="/assets/images/career-3.jpg" alt="Digital Strategy" style={{width: '100%', height: '100%', objectFit: 'cover'}} /></div>
          </div>

          <div className="perks-grid reveal-stagger">
            <Perk icon="ti-rocket" title="Exponential Growth" text="Collaborate directly with our Yale & UPenn alumni founders in a fast-paced, mission-driven environment." />
            <Perk icon="ti-certificate" title="Professional Mastery" text="We sponsor your pursuit of advanced certifications in AI architecture, Cloud security, and Deep Learning." />
            <Perk icon="ti-device-laptop" title="Workstations" text="Leverage the latest M3-Max MacBooks and high-performance peripherals designed for extreme productivity." />
            <Perk icon="ti-heart-rate-monitor" title="Total Wellness" text="Comprehensive medical coverage and mental health support for you and your family’s complete peace of mind." />
            <Perk icon="ti-plane-departure" title="Location Autonomy" text="Experience a hybrid-first culture. Choose between our high-end San Francisco hub or work from anywhere." />
            <Perk icon="ti-gift" title="Value Sharing" text="Benefit from our performance-based profit-sharing model and milestone-driven technical bonuses." />
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="hiring-process" style={{padding: '100px 0', background: 'var(--bg-alt)'}}>
        <div className="container">
          <div style={{textAlign: 'center', marginBottom: '60px'}}>
            <div className="section-label" style={{justifyContent: 'center'}}>The Path to SATS</div>
            <h2 className="section-heading">How We <em>Hire</em></h2>
          </div>

          <div className="process-visual reveal-stagger">
            <Step num="01" title="Initial Audit" desc="In-depth portfolio evaluation and academic verification (Yale/UPenn focus)." />
            <Step num="02" title="Technical Deep-Dive" desc="Advanced algorithmic and systems architecture challenge with our Chief Architect." />
            <Step num="03" title="Cultural Synergy" desc="Strategic discussion with our leadership council to ensure absolute DNA alignment." />
            <Step num="04" title="The Deployment" desc="Formal offer to join our elite squad of technical innovators." />
          </div>
        </div>
      </section>

      {/* ═══ OPEN POSITIONS ═══ */}
      <section id="positions" className="open-positions" style={{padding: '100px 0'}}>
        <div className="container">
          <div className="job-list-header reveal" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', borderBottom: '1px solid var(--border)', paddingBottom: '24px', flexWrap: 'wrap', gap: '20px'}}>
            <div>
              <div className="section-label">Opportunities</div>
              <h2 className="section-heading" style={{marginBottom: 0}}>Open <em>Roles</em></h2>
            </div>
            <p style={{color: 'var(--text-500)', fontWeight: 600}}>3 Available Positions</p>
          </div>

          <div className="reveal-stagger">
            <JobCard
              title="Principal AI/ML Architect"
              desc="Design and deploy scalable Neural Architectures and RAG pipelines for multi-billion dollar healthcare enterprises. Expertise in PyTorch & CUDA required."
              tags={[{ icon: 'ti-briefcase', text: 'Full-Time' }, { icon: 'ti-map-pin', text: 'Hybrid / SF' }, { icon: 'ti-flame', text: 'Strategic Role', highlight: true }]}
            />
            <JobCard
              title="Senior Full-Stack Cloud Architect"
              desc="Lead the engineering of autonomous dashboard ecosystems. Mastery of Next.js 15, TypeScript, and high-concurrency cloud environments is essential."
              tags={[{ icon: 'ti-briefcase', text: 'Full-Time' }, { icon: 'ti-world', text: 'Remote' }, { icon: 'ti-code', text: 'Infrastructure' }]}
            />
            <JobCard
              title="Cybersecurity Infrastructure Lead"
              desc="Harden enterprise-grade cloud environments and audit codebases for 2026 Zero-Trust compliance standards. Focus on automated threat mitigation."
              tags={[{ icon: 'ti-lock', text: 'Full-Time' }, { icon: 'ti-map-pin', text: 'San Francisco' }, { icon: 'ti-shield-check', text: 'SecOps' }]}
            />
          </div>

          <div style={{marginTop: '80px', textAlign: 'center', background: 'var(--bg-alt)', padding: '60px 20px', borderRadius: 'var(--radius-lg)'}} className="reveal">
            <h3 style={{fontWeight: 800, marginBottom: '12px'}}>Uncharted Territories</h3>
            <p style={{color: 'var(--text-500)', marginBottom: '30px'}}>We maintain a perpetual search for the top 1% of technical talent. Submit a general inquiry to join our elite roster.</p>
            <Link to="/contact" className="btn btn--outline">Submit General Inquiry</Link>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <div className="cta-banner">
        <div className="container" style={{textAlign: 'center'}}>
          <h2 style={{color: '#fff', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '24px'}}>Ascend Your <em>Technical</em> Career.</h2>
          <p style={{color: 'rgba(255,255,255,0.7)', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px'}}>Join an elite network that prioritizes radical transparency, technical mastery, and absolute engineering integrity.</p>
          <Link to="/contact" className="btn btn--primary" style={{padding: '18px 40px', fontSize: '1rem'}}>Secure Your Future</Link>
        </div>
      </div>
    </main>
  );
};

const Perk = ({ icon, title, text }) => (
  <div className="perk reveal" style={{background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '32px'}}>
    <i className={`ti ${icon}`} style={{fontSize: '28px', color: 'var(--primary)', marginBottom: '16px', display: 'block'}}></i>
    <h4>{title}</h4>
    <p style={{fontSize: '13.5px', color: 'var(--text-500)', lineHeight: 1.65}}>{text}</p>
  </div>
);

const Step = ({ num, title, desc }) => (
  <div className="step-node reveal" style={{textAlign: 'center', flex: 1}}>
    <div className="step-circle" style={{width: '60px', height: '60px', background: '#fff', border: '2px solid var(--primary)', borderRadius: '50%', margin: '0 auto 20px', display: 'grid', placeItems: 'center', fontWeight: 800, color: 'var(--primary)', boxShadow: '0 0 0 8px var(--brand-tint)'}}>{num}</div>
    <h4 style={{fontWeight: 700, marginBottom: '8px'}}>{title}</h4>
    <p style={{fontSize: '13px', color: 'var(--text-500)'}}>{desc}</p>
  </div>
);

const JobCard = ({ title, desc, tags }) => (
  <div className="job-card-premium reveal">
    <div className="job-main-info">
      <div className="job-meta-pills">
        {tags.map((t, i) => (
          <span key={i} className="pill" style={{padding: '6px 14px', background: t.highlight ? 'var(--primary-light)' : 'var(--bg-alt)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, color: t.highlight ? 'var(--primary)' : 'var(--text-500)', display: 'flex', alignItems: 'center', gap: '6px'}}>
            <i className={t.icon}></i> {t.text}
          </span>
        ))}
      </div>
      <h4>{title}</h4>
      <p style={{fontSize: '14.5px', color: 'var(--text-500)', maxWidth: '600px', lineHeight: 1.6}}>{desc}</p>
    </div>
    <Link to="/contact" className="btn btn--primary">Apply for Role <i className="ti ti-arrow-right"></i></Link>
  </div>
);

export default Careers;



