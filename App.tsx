import React from 'react';
import { useHashRoute } from './useHashRoute';
import { HomePage } from './pages/HomePage';
import { PersonalStatementPage } from './pages/PersonalStatementPage';
import { StatementOfPurposePage } from './pages/StatementOfPurposePage';

const App: React.FC = () => {
  const { page } = useHashRoute();

  if (page === 'personal-statement') {
    return <PersonalStatementPage />;
  }
  if (page === 'statement-of-purpose') {
    return <StatementOfPurposePage />;
  }

  return <HomePage />;
};

export default App;
