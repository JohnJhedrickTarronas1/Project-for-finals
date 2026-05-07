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

  const headerStyle = {
    width: '100%',
    backgroundColor: '#d7f2ef',
    borderBottom: '2px solid violet',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const navStyle = {
    display: 'flex',
    gap: '40px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '14px',
    color: '#333',
  };

  const heroStyle = {
    position: 'relative',
    height: 'calc(100vh - 80px)',
    overflow: 'hidden',
  };

  const backgroundStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    padding: '20px 8px',
    borderRadius: '0 16px 16px 0',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    zIndex: 20,
  };

  const heroContentStyle = {
    position: 'relative',
    zIndex: 10,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
  };

  const textStyle = {
    maxWidth: '600px',
    color: '#000',
    marginTop: '-80px',
  };

  const buttonStyle = {
    marginTop: '32px',
    padding: '12px 32px',
    borderRadius: '9999px',
    backgroundColor: '#000',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
  };

  const cardContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    backgroundColor: 'rgba(255,255,255,0.25)',
    backdropFilter: 'blur(8px)',
    padding: '20px',
    borderRadius: '32px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    marginRight: '16px',
  };

  const cardStyle = {
    position: 'relative',
    width: '256px',
    height: '144px',
    borderRadius: '16px',
    overflow: 'hidden',
    cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e8f7f5', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 'bold',
              transform: 'rotate(45deg)',
            }}
          >
            ✦
          </div>
        </div>

        <nav style={navStyle}>
          <a href="#">Home</a>
          <a href="#">Map</a>
          <a href="#">Itinerary</a>
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#fff',
            border: '1px solid #666',
            borderRadius: '9999px',
            padding: '4px 12px',
            width: '160px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              background: 'transparent',
              outline: 'none',
              fontSize: '14px',
              flex: 1,
              border: 'none',
            }}
          />
          <span style={{ color: '#666' }}>⌕</span>
        </div>
      </header>

      {/* Hero Section */}
      <main style={heroStyle}>
        <div style={backgroundStyle} />
        <div style={overlayStyle} />

        {/* Social Sidebar */}
        <div style={sidebarStyle}>
          <a href="#" style={{ ...iconStyle }}>f</a>
          <a href="#" style={{ ...iconStyle }}>t</a>
          <a href="#" style={{ ...iconStyle }}>◎</a>
          <a href="#" style={{ ...iconStyle }}>✉</a>
        </div>

        {/* Main Content */}
        <div style={heroContentStyle}>
          {/* Left Text */}
          <div style={textStyle}>
            <p style={{ fontSize: '64px', fontWeight: 300, lineHeight: '1.2' }}>Your Dream</p>
            <h1 style={{ fontSize: '80px', fontWeight: 900, textTransform: 'uppercase' }}>
              Vacation
            </h1>
            <p style={{ marginTop: '24px', fontSize: '18px', color: '#333', maxWidth: '400px' }}>
              Discover tropical escapes, breathtaking mountains, and unforgettable adventures around the world.
            </p>
            <button style={buttonStyle}>Explore Now</button>
          </div>

          {/* Destination Cards */}
          <div style={cardContainerStyle}>
            {destinations.map((place, index) => (
              <div key={index} style={cardStyle}>
                <img
                  src={place.image}
                  alt={place.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s',
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
                    fontSize: '18px',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
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

const iconStyle = {
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '12px',
  cursor: 'pointer',
};
