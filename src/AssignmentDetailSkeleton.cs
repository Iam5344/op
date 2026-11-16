export function AssignmentDetailSkeleton() {
  const lineStyle = {
    backgroundColor: '#e5e7eb',
    borderRadius: '4px',
    marginBottom: '10px',
  };

  return (
    <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
      <div style={{ ...lineStyle, width: '50%', height: '24px' }} />
      <div style={{ ...lineStyle, width: '35%', height: '18px' }} />
      <div style={{ ...lineStyle, width: '90%', height: '16px', marginTop: '16px' }} />
      <div style={{ ...lineStyle, width: '40%', height: '16px' }} />
      <div style={{ ...lineStyle, width: '40%', height: '16px' }} />
      <div style={{ ...lineStyle, width: '30%', height: '32px', marginTop: '16px' }} />
    </div>
  );
}
