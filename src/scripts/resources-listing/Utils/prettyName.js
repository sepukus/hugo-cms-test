const prettifyName = (name) => {
  return (
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/_/g, " ").replace(/-/g, " ")
  );
};

export default prettifyName;
