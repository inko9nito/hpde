interface Props {
  checked: boolean
  onChange: () => void
  label?: string
}

export function Toggle({ checked, onChange, label }: Props) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', userSelect: 'none' }}>
      {label && <span style={{ fontSize: '14px', color: '#4b5563' }}>{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          backgroundColor: checked ? '#000000' : '#d1d5db',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          flexShrink: 0,
          transition: 'background-color 0.2s ease',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '2px',
            left: checked ? '22px' : '2px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
            transition: 'left 0.2s ease',
            display: 'block',
          }}
        />
      </button>
    </label>
  )
}
