import Alert from '@mui/material/Alert';

interface BasicAlertProps {
  severity: 'error' | 'info' | 'success' | 'warning';
  message: string;
}

export default function BasicAlert(props: BasicAlertProps) {
  const { severity, message } = props;
  return (
    <Alert icon={false} severity={severity}>
      {message}
    </Alert>
  );
}
