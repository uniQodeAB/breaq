export default function deepGet(obj, props, defaultValue) {
  // If we have reached an undefined/null property
  // then stop executing and return the default value.
  // If no default was provided it will be undefined.
  if (obj === undefined || obj === null) {
    return defaultValue;
  }

  // If the path array has no more elements, we've reached
  // the intended property and return its value
  if (props.length === 0) {
    return obj;
  }

  // Prepare our found property and path array for recursion
  const foundSoFar = obj[props[0]];
  const remainingProps = props.slice(1);

  return deepGet(foundSoFar, remainingProps, defaultValue);
}
