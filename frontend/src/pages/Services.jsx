import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Custom hook for animated counters
const useAnimatedCounter = (target, duration = 2000) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let startTime = null;
          const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
          
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutCubic(progress);
            
            if (elementRef.current) {
              elementRef.current.textContent = Math.round(easedProgress * target);
            }
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return { elementRef };
};

// Extracted component for the stats to keep JSX clean
const AnimatedStat = ({ target, suffix = '', label }) => {
  const { elementRef } = useAnimatedCounter(target);
  
  return (
    <div className="sv-stat">
      <div className="sv-stat-num"><span ref={elementRef}>0</span><span>{suffix}</span></div>
      <div className="sv-stat-label">{label}</div>
    </div>
  );
};

const Services = () => {
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
        title="Enterprise AI & Automation Services"
        description="Scale your enterprise operations and reduce headcount with secure, intelligent AI systems. Specializing in medical and technical automation."
        keywords="Enterprise AI, Medical AI, Tech Ops Automation, RPA, USA Automation"
      />
      {/* ═══ HERO ═══ */}
      <section className="sv-hero" style={{
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden',
        padding: '160px 0 100px',
        backgroundColor: '#000000'
      }}>
        {/* NYC Skyline "Live" Background Layer */}
        <div
          className="live-space-bg"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage: "url('/epic_newyork.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.85,
            filter: 'contrast(1.05) brightness(0.62) saturate(0.9)'
          }}
        ></div>

        {/* Professional Dark-to-Light Overlay for Text Readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.8) 100%)',
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="section-label" style={{justifyContent: 'center', marginBottom: '24px', color: 'var(--brand-primary)', fontWeight: 800}}>Enterprise AI & Automation</div>
          <h1 className="reveal" style={{ color: '#fff', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '-2px', fontWeight: 900, textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
            Orchestrating the <em style={{color: 'var(--brand-primary-soft)', fontStyle: 'normal'}}>Autonomous Enterprise.</em><br />Scale Infinitely.
          </h1>
          <p className="sv-hero-sub reveal" style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto 48px', fontSize: '1.25rem', fontWeight: 600, textShadow: '0 2px 10px rgba(0,0,0,0.4)' }}>SATS Solutions engineers hyper-intelligent AI ecosystems for global medical and technical firms. We eliminate operational friction, automate high-stakes documentation, and achieve unprecedented cost efficiencies through elite-tier engineering.</p>
          <div className="hero-btns" style={{justifyContent: 'center', animationDelay: '0.2s'}}>
            <Link to="/contact" className="btn btn--primary"><i className="ti ti-arrow-right"></i> Get a Free Automation Audit</Link>
            <a href="#capabilities" className="btn btn--outline" style={{ color: '#fff', borderColor: '#fff' }}>View Capabilities</a>
          </div>
          
          {/* Stats Bar */}
          <div className="sv-stats-bar-wrapper reveal">
            <div className="sv-stats-bar">
              <AnimatedStat target={60} suffix="%" label="Cost Reduction" />
              <AnimatedStat target={99} suffix=".9%" label="Uptime SLA" />
              <AnimatedStat target={24} suffix="/7" label="Autonomous Ops" />
              <AnimatedStat target={100} suffix="x" label="Faster Processing" />
            </div>
            <div className="sv-stats-glow"></div>
          </div>
        </div>
      </section>

      {/* ═══ CAPABILITIES ═══ */}
      <section id="capabilities" style={{paddingTop: '80px'}}>
        <div className="container">
          <div className="section-label">Strategic Capabilities</div>
          <h2 className="section-heading">High-Stakes <em>Automation</em></h2>
          <p className="section-sub" style={{marginBottom: '60px'}}>Specialized AI frameworks designed to replace repetitive manual labor across high-compliance industries with absolute precision.</p>

          <div className="services-grid reveal-stagger">
            <div className="svc-card svc-card--accent-blue reveal">
              <div className="svc-num">01</div>
              <div className="svc-icon svc-icon--blue"><i className="ti ti-stethoscope"></i></div>
              <h3>Precision Medical AI</h3>
              <p>Advanced patient onboarding, clinical NLP, and automated medical billing. Our HIPAA-compliant models extract historical data 100x faster than administrative staff.</p>
              <div className="tag-row"><span className="tag">Clinical NLP</span><span className="tag">Data Sovereignty</span><span className="tag">HL7/FHIR</span></div>
            </div>

            <div className="svc-card svc-card--accent-amber reveal">
              <div className="svc-num">02</div>
              <div className="svc-icon svc-icon--amber"><i className="ti ti-cpu"></i></div>
              <h3>Autonomous AIOps</h3>
              <p>Eliminate manual L1 support and infrastructure monitoring with self-healing AI agents. Reduce your IT overhead while achieving sub-millisecond response times.</p>
              <div className="tag-row"><span className="tag">Self-Healing</span><span className="tag">Agentic Workflows</span><span className="tag">RPA</span></div>
            </div>

            <div className="svc-card reveal">
              <div className="svc-num">03</div>
              <div className="svc-icon"><i className="ti ti-code"></i></div>
              <h3>Bespoke Engineering</h3>
              <p>Enterprise-grade architecture engineered to serve as the secure foundation for your organization’s next-generation automated capabilities.</p>
              <div className="tag-row"><span className="tag">Scalability</span><span className="tag">Cloud Native</span><span className="tag">Robust Code</span></div>
            </div>

            <div className="svc-card reveal">
              <div className="svc-num">04</div>
              <div className="svc-icon"><i className="ti ti-cloud-computing"></i></div>
              <h3>Cloud & Infrastructure</h3>
              <p>Secure cloud environments configured specifically to handle high-bandwidth AI inference and large-scale enterprise data processing.</p>
              <div className="tag-row"><span className="tag">AWS</span><span className="tag">Azure</span><span className="tag">GCP</span></div>
            </div>

            <div className="svc-card reveal">
              <div className="svc-num">05</div>
              <div className="svc-icon"><i className="ti ti-building-factory-2"></i></div>
              <h3>ERP & CRM AI Integration</h3>
              <p>Supercharge your existing Dynamics, Salesforce, or SAP instances with predictive analytics and automated data entry pipelines.</p>
              <div className="tag-row"><span className="tag">Dynamics 365</span><span className="tag">Salesforce</span><span className="tag">SAP</span></div>
            </div>

            <div className="svc-card reveal">
              <div className="svc-num">06</div>
              <div className="svc-icon"><i className="ti ti-shield-check"></i></div>
              <h3>Cybersecurity & Compliance</h3>
              <p>Rigorous security frameworks ensuring that all automated data pipelines adhere strictly to global privacy and data protection standards.</p>
              <div className="tag-row"><span className="tag">ISO 27001</span><span className="tag">SOC 2</span><span className="tag">Zero Trust</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BEFORE & AFTER ═══ */}
      <section className="ba-section">
        <div className="container">
          <div className="section-label">Business Impact</div>
          <h2 className="section-heading">Why <em>Automate?</em></h2>
          <p className="section-sub">See how traditional manual workflows in medical and technical fields compare against our AI-automated environments.</p>

          <div className="ba-matrix reveal">
            <div className="ba-col before">
              <div className="ba-head"><i className="ti ti-circle-x"></i> Legacy Ecosystem</div>
              <ul className="ba-list">
                <li><i className="ti ti-users"></i> Burdened by prohibitive labor overhead</li>
                <li><i className="ti ti-clock-pause"></i> Temporal constraints inhibiting scalability</li>
                <li><i className="ti ti-alert-triangle"></i> Susceptible to manual operational inaccuracies</li>
                <li><i className="ti ti-trending-down"></i> Escalating OPEX and salary expenditures</li>
                <li><i className="ti ti-file-text"></i> Latent response times to technical/clinical triage</li>
              </ul>
            </div>
            <div className="ba-col after">
              <div className="ba-head"><i className="ti ti-circle-check"></i> SATS Neural Infrastructure</div>
              <ul className="ba-list">
                <li><i className="ti ti-users-minus"></i> Unbound horizontal scalability without headcount inflation</li>
                <li><i className="ti ti-bolt"></i> Perpetual 24/7/365 autonomous orchestration</li>
                <li><i className="ti ti-target"></i> Zero-error precision through sovereign LLMs</li>
                <li><i className="ti ti-trending-up"></i> Drastic compression of operational OPEX</li>
                <li><i className="ti ti-rocket"></i> Instantaneous L1 resolution and intelligent routing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TECHNOLOGY STACK ═══ */}
      <section>
        <div className="container">
          <div className="section-label">Our Stack</div>
          <h2 className="section-heading">Enterprise AI <em>Technologies</em></h2>

          <div className="tech-grid reveal-stagger">
            <div className="tech-card reveal">
              <div className="tech-icon"><i className="ti ti-brain"></i></div>
              <h4>Custom LLMs</h4>
              <p>Privately hosted, secure Large Language Models fine-tuned for medical terminology and technical IT support.</p>
            </div>
            <div className="tech-card reveal">
              <div className="tech-icon"><i className="ti ti-robot"></i></div>
              <h4>RPA Agents</h4>
              <p>Robotic Process Automation scripts that seamlessly click, type, and navigate legacy software like a human.</p>
            </div>
            <div className="tech-card reveal">
              <div className="tech-icon"><i className="ti ti-scan"></i></div>
              <h4>Computer Vision</h4>
              <p>Advanced OCR and layout recognition to digitize handwritten medical charts and technical schematics instantly.</p>
            </div>
            <div className="tech-card reveal">
              <div className="tech-icon"><i className="ti ti-database-export"></i></div>
              <h4>Cloud Data Lakes</h4>
              <p>Centralized, scalable, and compliant data storage solutions powered by AWS and Azure for real-time analytics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section className="process-section">
        <div className="container">
          <div className="section-label">Engagement Model</div>
          <h2 className="section-heading">How We <em>Implement</em></h2>

          <div className="process-grid reveal-stagger">
            <div className="process-step reveal">
              <div className="step-num">1</div>
              <h4>Operational Audit</h4>
              <p>We analyze your technical landscape to identify high-friction manual tasks inflating your labor expenditures.</p>
            </div>
            <div className="process-step reveal">
              <div className="step-num">2</div>
              <h4>Neural Architecture</h4>
              <p>We design a sovereign, high-compliance AI blueprint tailored for seamless integration with your existing stack.</p>
            </div>
            <div className="process-step reveal">
              <div className="step-num">3</div>
              <h4>Core Deployment</h4>
              <p>Our architects deploy autonomous agents and establish secure, high-concurrency data pipelines.</p>
            </div>
            <div className="process-step reveal">
              <div className="step-num">4</div>
              <h4>Iterative Alpha</h4>
              <p>Continuous refinement of the neural systems to ensure maximum operational ROI and absolute precision.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <div className="cta-banner">
        <div className="cta-bg-effects">
          <div className="cta-orb cta-orb--1"></div>
          <div className="cta-orb cta-orb--2"></div>
        </div>
        <h2>Ready to Automate Your <em>Enterprise?</em></h2>
        <p className="cta-sub">Schedule a free automation audit to see exactly how much overhead our AI solutions can cut from your business operations.</p>
        <Link to="/contact" className="btn btn--white">Request Automation Audit</Link>
      </div>
    </main>
  );
};

export default Services;
