import type React from 'react'

export const formStyles = {
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#111',
    marginBottom: '8px',
    lineHeight: 1.3,
  } as React.CSSProperties,

  subtitle: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '28px',
    lineHeight: 1.5,
  } as React.CSSProperties,

  fieldGroup: {
    marginBottom: '16px',
  } as React.CSSProperties,

  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#333',
    marginBottom: '6px',
  } as React.CSSProperties,

  inputWrapper: {
    position: 'relative' as const,
  } as React.CSSProperties,

  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#111',
    outline: 'none',
    transition: 'border-color 0.15s',
  } as React.CSSProperties,

  inputWithToggle: {
    width: '100%',
    padding: '10px 40px 10px 12px',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    color: '#111',
    outline: 'none',
    transition: 'border-color 0.15s',
  } as React.CSSProperties,

  toggleBtn: {
    position: 'absolute' as const,
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#777',
    padding: '0',
    fontSize: '13px',
    lineHeight: 1,
  } as React.CSSProperties,

  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  } as React.CSSProperties,

  checkboxLabel: {
    fontSize: '13px',
    color: '#444',
  } as React.CSSProperties,

  primaryBtn: {
    width: '100%',
    padding: '11px',
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginBottom: '16px',
    transition: 'background-color 0.15s',
  } as React.CSSProperties,

  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    color: '#aaa',
    fontSize: '12px',
  } as React.CSSProperties,

  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e0e0e0',
  } as React.CSSProperties,

  outlineBtn: {
    width: '100%',
    padding: '11px',
    backgroundColor: '#fff',
    color: '#111',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    marginBottom: '24px',
  } as React.CSSProperties,

  links: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    gap: '10px',
    marginTop: '8px',
  } as React.CSSProperties,

  link: {
    fontSize: '13px',
    color: '#555',
    textDecoration: 'underline',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  } as React.CSSProperties,

  error: {
    color: '#c00',
    fontSize: '13px',
    marginBottom: '12px',
  } as React.CSSProperties,

  success: {
    color: '#1a7a1a',
    fontSize: '13px',
    marginBottom: '12px',
  } as React.CSSProperties,

  signupRow: {
    fontSize: '13px',
    color: '#555',
    marginBottom: '28px',
  } as React.CSSProperties,
}
