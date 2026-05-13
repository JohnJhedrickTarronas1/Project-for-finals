import { useEffect, useRef } from 'react';

export default function DreamVacationApp() {
  const destinations = [
    {
      title: 'Island Paradise',
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Mountain Escape',
      image:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    },
    {
      title: 'Adventure Peak',
      image:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;

    const interval = setInterval(() => {
      if (!container) return;

      const scrollAmount = 280;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Styles
  const headerStyle = {
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(215,242,239,0.85)',
    borderBottom: '2px solid violet',
    padding: 'clamp(8px, 2vw, 16px) clamp(12px, 3vw, 24px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const navStyle = {
    display: 'flex',
    gap: 'clamp(16px, 4vw, 40px)',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: 'clamp(12px, 2vw, 16px)',
    fontWeight: '600',
    color: '#333',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
  };

  const heroStyle = {
    position: 'relative',
    minHeight: 'calc(100vh - 80px)',
    overflow: 'hidden',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
  };

  const sidebarStyle = {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#99f4ec',
    padding: 'clamp(12px, 2vw, 20px) 8px',
    borderRadius: '0 16px 16px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 20,
  };

  const heroContentStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'clamp(16px, 5vw, 40px)',
    gap: '40px',
    boxSizing: 'border-box',
  };

  const textStyle = {
    textAlign: 'center',
    color: '#000',
  };

  const buttonStyle = {
    marginTop: '32px',
    padding: '12px 32px',
    borderRadius: '9999px',
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    backgroundColor: 'rgba(255,255,255,0.25)',
    backdropFilter: 'blur(8px)',
    padding: '20px',
    borderRadius: '32px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    boxSizing: 'border-box',
    overflowX: 'auto',
    scrollBehavior: 'smooth',
  };

  const cardStyle = {
    position: 'relative',
    width: '260px',
    height: '160px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
    flexShrink: 0,
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        fontFamily: 'sans-serif',
        backgroundImage:
          "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Header */}
      <header style={headerStyle}>
        <div>✦</div>

        <nav style={navStyle}>
          <a href="#" style={navLinkStyle}>Home</a>
          <a href="#" style={navLinkStyle}>Map</a>
          <a href="#" style={navLinkStyle}>Itinerary</a>
        </nav>

        {/* 🔥 NEW SEARCH BAR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255,255,255,0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '9999px',
            padding: '6px 10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          <input
            type="text"
            placeholder="Search destinations..."
            style={{
              background: 'transparent',
              outline: 'none',
              border: 'none',
              fontSize: '14px',
              padding: '6px 10px',
              width: '140px',
              color: '#333',
            }}
          />

          <button
            style={{
              backgroundColor: '#000',
              color: '#fff',
              border: 'none',
              borderRadius: '9999px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#333')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#000')}
          >
            Search
          </button>
        </div>
      </header>

      {/* Hero */}
      <main style={heroStyle}>
        <div style={overlayStyle} />

        <div style={sidebarStyle}>
          <div style={iconStyle}>f</div>
          <div style={iconStyle}>t</div>
          <div style={iconStyle}>◎</div>
        </div>

        <div style={heroContentStyle}>
          <div style={textStyle}>
            <p style={{ fontSize: '48px' }}>Your Dream</p>
            <h1 style={{ fontSize: '64px' }}>VACATION</h1>
            <button style={buttonStyle}>Explore Now</button>
          </div>

          {/* CAROUSEL */}
          <div style={cardContainerStyle} ref={scrollRef}>
            {destinations.map((place, index) => (
              <div key={index} style={cardStyle}>
                <img
                  src={place.image}
                  alt={place.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    left: '16px',
                    color: '#fff',
                    fontWeight: '600',
                  }}
                >
                  {place.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
