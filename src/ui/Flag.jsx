import { code } from "country-emoji";
import { styled, css } from "styled-components";
const StyledFlag = styled.img`
  max-width: 2rem;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);
`;

export default function Flag(props) {
  const flag = props?.src ? code(props.src)?.toLocaleLowerCase() : "";

  return (
    <StyledFlag
      {...props}
      src={`https://flagcdn.com/36x27/${flag}.png`}
      $srcset={`https://flagcdn.com/72x54/${flag}.png 2x,
      https://flagcdn.com/108x81/${flag}.png 3x`}
    />
  );
}
