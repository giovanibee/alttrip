import './InfoField.scss';

interface InfoFieldProps {
  label?: string;
  value?: string;
}

export function InfoField ({ label, value }: InfoFieldProps) {
  return (
    <div className="info-field">
      <div className="info-field-label">{label}</div>
      <div className="info-field-value">{value}</div>
    </div>
  )
}