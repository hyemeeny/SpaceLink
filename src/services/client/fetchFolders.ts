const fetchFolders = async () => {
  const res = await fetch("/api/folders");

  if (!res.ok) throw new Error("folders fetch failed");

  return res.json();
};

export default fetchFolders;
