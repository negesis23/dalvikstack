export function Island(props) {
  const { name, children, ...rest } = props;
  
  // Serialize and URI-encode props to protect quotes from the global HTML decoder
  const propsString = Object.keys(rest).length > 0 ? encodeURIComponent(JSON.stringify(rest)) : null;
  
  return (
    <div data-island={name} data-props={propsString} class="island-container w-full">
      {children}
    </div>
  );
}
