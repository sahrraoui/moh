import React from 'react';

const RectangleCard = () => {
  return (
    <div style={{ 
      width: '250px',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
      flex: '0 0 auto'
    }}>
      {/* Photo Box */}
      <div style={{
        width: '100%',
        height: '180px',
        backgroundColor: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <span style={{ color: '#6b7280' }}>Hotel Image</span>
      </div>

      {/* Content Area */}
      <div style={{
        padding: '12px 16px'
      }}>
        {/* Hotel Name */}
        <h3 style={{ 
          margin: '0 0 4px 0',
          fontSize: '16px',
          fontWeight: '600',
          color: '#111827'
        }}>
          Hotel name
        </h3>

        {/* Location */}
        <p style={{ 
          margin: '0 0 8px 0',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          Constantine
        </p>

        {/* Price Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <p style={{ 
            margin: 0,
            fontSize: '14px',
            color: '#111827'
          }}>
            From...2000dzd/night
          </p>
          <span style={{
            color: '#111827',
            fontSize: '18px'
          }}>
            ›
          </span>
        </div>
      </div>
    </div>
  );
};

export default RectangleCard; 