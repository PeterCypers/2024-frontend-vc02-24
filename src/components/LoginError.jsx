import { isAxiosError } from 'axios';

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <div className="text-red-600" data-cy="axios_error_message">
        {error.response.status == "400" ? "Ongeldig emailadres" : "Gebruiker niet gevonden, controleer de email en wachtwoord combinatie"}
      </div>
    );
  }

  if (error) {
    return (
      <div data-cy="error_message">
        <h4 className="decoration-red-600">An unexpected error occured</h4>
        {error.message || JSON.stringify(error)}
      </div>
    );
  }

  return null;
}