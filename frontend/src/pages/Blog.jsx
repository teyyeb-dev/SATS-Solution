import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import SEO from '../components/SEO';

const blogArticles = [
  {
    id: 'gen-ai',
    tag: 'White Paper',
    title: 'Sovereign Neural Architectures',
    img: '/assets/images/blog-1.jpg',
    desc: 'Engineering private, localized LLM ecosystems to ensure absolute data sovereignty in high-compliance sectors.'
  },
  {
    id: 'hybrid-cloud',
    tag: 'Technical Guide',
    title: 'Hardening Hybrid-Cloud Topologies',
    img: '/assets/images/blog-2.jpg',
    desc: 'Orchestrating sub-5ms synchronization between legacy infrastructure and public cloud scalability.'
  },
  {
    id: 'zero-trust',
    tag: 'Case Study',
    title: 'The UPenn Zero-Trust Protocol',
    img: '/assets/images/blog-3.jpg',
    desc: 'A strategic 12-month evolution in identity-centric security, fortifying over 5,000 enterprise endpoints.'
  },
  {
    id: 'python-ai',
    tag: 'Engineering',
    title: 'High-Velocity AI Inference',
    img: '/assets/images/blog-4.jpg',
    desc: 'Leveraging NVIDIA TensorRT and FastAPI to achieve unprecedented response times in neural production.'
  },
  {
    id: 'soc2',
    tag: 'Compliance',
    title: 'The CTO’s Compliance Blueprint',
    img: '/assets/images/blog-5.jpg',
    desc: 'A high-level strategic checklist for preparing enterprise infrastructure for rigorous 2026 security audits.'
  },
  {
    id: 'edge-comp',
    tag: 'Infrastructure',
    title: 'The Autonomous Latency Imperative',
    img: '/assets/images/blog-6.jpg',
    desc: 'Analyzing why sub-millisecond edge processing is the mandatory frontier for smart industrial ecosystems.'
  }
];

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

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

  const generatePDF = (title) => {
    const doc = new jsPDF();
    let y = 30;

    const addText = (text, size = 12, style = "normal", color = [0, 0, 0]) => {
      doc.setFont("times", style);
      doc.setFontSize(size);
      doc.setTextColor(color[0], color[1], color[2]);
      const lines = doc.splitTextToSize(text, 170);
      doc.text(lines, 20, y);
      y += (lines.length * (size * 0.5)) + 8;
    };

    doc.setFont("times", "bold");
    doc.setFontSize(26);
    doc.setTextColor(0, 82, 204);
    doc.text("SATS SOLUTIONS", 105, y, { align: "center" }); y += 15;
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 100);
    doc.text("EXECUTIVE STRATEGIC BLUEPRINT 2026", 105, y, { align: "center" }); y += 20;
    doc.setLineWidth(0.8);
    doc.line(20, y, 190, y); y += 15;

    addText(`TITLE: ${title.toUpperCase()}`, 16, "bold", [10, 22, 40]);
    addText("1. EXECUTIVE SUMMARY", 14, "bold", [0, 82, 204]);
    addText("In 2026, the global enterprise landscape is no longer defined by simple data accumulation, but by the velocity and integrity of autonomous decision engines. SATS Solutions provides the strategic architecture required to evolve from legacy manual operations to fully orchestrated AI ecosystems.", 11);

    addText("2. THE SATS DNA: ELITE LEADERSHIP", 14, "bold", [0, 82, 204]);
    addText("Our firm is built upon the academic excellence of USA America's most prestigious institutions, bringing together a technical council that understands both business logic and deep-code implementation.", 11);

    doc.addPage(); y = 30;
    addText("3. CORE TECHNICAL PILLARS", 14, "bold", [0, 82, 204]);

    addText("3.1 PRIVATE CLOUD LLM DEPLOYMENT", 12, "bold");
    addText("Unlike generic, public AI models, SATS engineers build 'walled-garden' AI architectures. We deploy localized Large Language Models (LLMs) that reside entirely within your VPC (Virtual Private Cloud).", 11);

    addText("3.2 ZERO-TRUST SECURITY INFRASTRUCTURE", 12, "bold");
    addText("With our UPenn-bred cybersecurity DNA, we eliminate the concept of 'trusted networks.' Every request, every packet, and every identity is verified at the application layer.", 11);

    doc.addPage(); y = 30;
    addText("4. SECTOR APPLICATIONS: REAL-WORLD IMPACT", 14, "bold", [0, 82, 204]);

    addText("4.1 MEDICAL AUTOMATION", 12, "bold");
    addText("SATS Solutions has pioneered an AI-driven NLP pipeline that automates HL7/FHIR data extraction. By digitizing handwritten physician notes and clinical logs with 99.8% accuracy, we reduce hospital administrative headcount by up to 30%.", 11);

    y += 20;
    doc.setLineWidth(0.5); doc.line(20, y, 190, y); y += 15;

    addText("5. CONCLUSION", 14, "bold", [0, 82, 204]);
    addText("SATS Solutions is not just a technology provider; we are a partner in your long-term evolution.", 11);

    y = 260;
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text("© 2026 SATS Solutions. All rights reserved.", 105, y, { align: "center" });

    doc.save(`SATS_${title.replace(/\s+/g, '_')}_2026.pdf`);
  };

  return (
    <main id="main-content">
      <SEO
        title="Technical Insights | Enterprise AI Whitepapers"
        description="Access professional whitepapers and technical guides on Generative AI, Zero Trust infrastructure, and high-concurrency Python inference."
        keywords="AI Whitepapers, Technical Blog, Cloud Security Guide, Enterprise AI Roadmap"
      />
      {/* ═══ HERO ═══ */}
      <header className="insight-hero" style={{padding: '120px 0 60px', textAlign: 'center', background: 'var(--bg)'}}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-label" style={{justifyContent: 'center'}}>Technical Intelligence</div>
          <h1 className="section-heading" style={{margin: '20px auto'}}>Engineering <em>Insights.</em></h1>
          <p className="section-sub" style={{margin: '0 auto'}}>Strategic analysis and formal whitepapers from the SATS technical leadership.</p>
        </div>
      </header>

      <section style={{padding: '60px 0 100px', background: 'var(--bg-alt)'}}>
        <div className="container">
          {/* Featured Section */}
          <div className="featured-banner reveal" style={{ background: 'linear-gradient(150deg, #000000 0%, #1c1c1e 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="featured-image-box" style={{background: "url('/epic_america.png') no-repeat center center", backgroundSize: 'cover', minHeight: '400px'}}></div>
            <div className="featured-body" style={{ color: '#fff' }}>
              <span className="insight-tag" style={{background: 'rgba(var(--brand-primary-rgb), 0.18)', padding: '6px 14px', borderRadius: '20px', fontSize: '10px', fontWeight: 800, color: 'var(--brand-primary)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', border: '1px solid rgba(var(--brand-primary-rgb), 0.35)'}}>Primary White Paper</span>
              <h2 style={{fontSize: '2.6rem', margin: '20px 0', color: '#fff', lineHeight: 1.2}}>The 2026 Enterprise <em style={{color: 'var(--brand-primary-soft)', fontStyle: 'normal'}}>AI Roadmap.</em></h2>
              <p className="insight-p" style={{fontSize: '1.1rem', marginBottom: '40px', color: 'rgba(235, 235, 245, 0.6)', lineHeight: 1.7}}>A formal 40-page technical framework for transitioning to autonomous operations with total data sovereignty. Authored by our elite technical council.</p>
              <button className="btn btn--primary" onClick={() => generatePDF("2026 Enterprise AI Roadmap")} style={{padding: '16px 40px', fontSize: '15px', background: 'var(--brand-primary)', border: 'none', boxShadow: '0 10px 26px -14px rgba(var(--brand-primary-rgb), 0.9)'}}>Download Full PDF <i className="ti ti-download"></i></button>
            </div>
          </div>

          {/* Main Insight Grid */}
          <div className="insight-grid reveal-stagger">
            {blogArticles.map((art) => (
              <article key={art.id} className="insight-card reveal" onClick={() => setSelectedArticle(art)} style={{background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'all 0.3s ease'}}>
                <div className="insight-thumb" style={{height: '220px', overflow: 'hidden'}}><img src={art.img} alt={art.title} style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease'}} /></div>
                <div className="insight-content" style={{padding: '30px', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <span className="insight-tag" style={{fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '15px', letterSpacing: '1px'}}>{art.tag}</span>
                  <h3 className="insight-h" style={{fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-900)', marginBottom: '12px', lineHeight: 1.3}}>{art.title}</h3>
                  <p className="insight-p" style={{fontSize: '14px', color: 'var(--text-500)', lineHeight: 1.6, marginBottom: '20px'}}>{art.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div className="newsletter-section reveal" style={{background: 'var(--bg-dark)', borderRadius: 'var(--radius-lg)', padding: '80px 20px', textAlign: 'center', color: '#fff', position: 'relative', overflow: 'hidden'}}>
            <h2 className="section-heading" style={{color: '#fff', marginBottom: '10px'}}>Stay Ahead of the <em>Technical</em> Curve.</h2>
            <p style={{opacity: 0.8, marginBottom: 40}}>Join 500+ CTOs and technical architects receiving our formal monthly briefing.</p>
            <form style={{display: 'flex', gap: 10, maxWidth: 500, margin: '0 auto', flexWrap: 'wrap'}}>
              <input type="email" placeholder="Work email" style={{flex: '1 1 250px', height: 50, borderRadius: 4, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)', padding: '0 20px', color: '#fff', outline: 'none'}} />
              <button type="submit" className="btn btn--primary" style={{flex: '1 1 120px', height: 50}}>Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      {selectedArticle && (
        <div className="cs-modal-overlay active" onClick={() => setSelectedArticle(null)} style={{position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
          <div className="cs-modal" onClick={e => e.stopPropagation()} style={{background: '#fff', maxWidth: '800px', width: '100%', borderRadius: 'var(--radius-lg)', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column'}}>
            <div className="cs-modal-header" style={{padding: '30px 40px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'var(--bg-alt)'}}>
              <div>
                <div className="cs-modal-meta" style={{fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--primary)', marginBottom: '8px'}}>{selectedArticle.tag}</div>
                <h2 className="cs-modal-title" style={{fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-900)', lineHeight: 1.2}}>{selectedArticle.title}</h2>
              </div>
              <button className="cs-modal-close" onClick={() => setSelectedArticle(null)} style={{background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: 'var(--text-500)'}}><i className="ti ti-x"></i></button>
            </div>
            <div className="cs-modal-body" style={{padding: '40px', overflowY: 'auto', color: 'var(--text-700)', lineHeight: 1.6}}>
              <p>This is a formal briefing on <strong>{selectedArticle.title}</strong>. For the full technical breakdown, please download the SATS Whitepaper using the primary link at the top of the page.</p>
              <p style={{marginTop: '20px'}}>Our team of engineers from University of Yale, University of Pennsylvania, and Harvard University have prepared these insights to help CTOs navigate the complexities of 2026 infrastructure.</p>
            </div>
            <div style={{padding: '30px 40px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', flexWrap: 'wrap', gap: '20px'}}>
              <span style={{fontSize: '13.5px', color: 'var(--text-500)', fontWeight: 600}}>Want the full detailed document?</span>
              <button className="btn btn--primary" onClick={() => generatePDF(selectedArticle.title)}>Download PDF <i className="ti ti-download"></i></button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Blog;




