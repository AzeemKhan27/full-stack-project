import React, { useState } from 'react';

const PdfModificationForm = ({ onSubmit }) => {
  const [search, setSearch] = useState('');
  const [replace, setReplace] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ search, replace });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <input type="text" placeholder="Replace" value={replace} onChange={(e) => setReplace(e.target.value)} />
      <button type="submit">Modify PDF</button>
    </form>
  );
};

export default PdfModificationForm;
