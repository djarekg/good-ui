import styles from './error-message.module.css';

type ErrorMessageProps = {
  message: string;
};

/**
 * ErrorMessage component.
 *
 * @param {string} message - The error message to display
 * @returns {JSX.Element}
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  'use memo';

  return <div className={styles.error}>{message}</div>;
}
