import { IonSpinner } from "@ionic/react";
import styled from "styled-components";

interface Props {
  name: any;
  color: string;
}

export const Spinner: React.FC<Props> = (props) => {
  return (
    <Wrapper>
      <SpinnerStyled {...props} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 8px;
`;

const SpinnerStyled = styled(IonSpinner)`
  margin: 0 auto;
`;
