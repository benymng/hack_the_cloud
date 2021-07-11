const Cook = (props) => {
  return <pre>{JSON.stringify(props.location.state.recipe, null, 2)}</pre>;
};

export default Cook;
