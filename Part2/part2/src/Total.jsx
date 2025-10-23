export const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (sum, part) => sum + part.exercises,
    0
  );
  return (
    <p>
      <b>Number of exercises {totalExercises}</b>
    </p>
  );
};
