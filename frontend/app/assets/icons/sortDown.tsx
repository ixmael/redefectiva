const SvgComponent = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={64}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill={props.fill}
      d="M19 16.25H5a.74.74 0 0 1-.69-.46.75.75 0 0 1 .16-.79l7-7a.75.75 0 0 1 1.06 0l7 7a.75.75 0 0 1 .16.82.74.74 0 0 1-.69.43Zm-12.19-1.5h10.38L12 9.56l-5.19 5.19Z"
    />
  </svg>
)
export default SvgComponent
