export const GlobalStream = ({
  response,
  extraClass,
}: { response: string; extraClass?: string }) => {
  return (
    <div className={`fr-my-1w ${extraClass}`}>
      <span>
        {response.split('\n').map((line, lineIndex) => (
          <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            {line}
          </span>
        ))}
      </span>
      )
    </div>
  )
}
