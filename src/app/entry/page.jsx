import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EntryPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
  }, []);

  return <Fragment></Fragment>;
}
