import { IonSpinner } from "@ionic/react";
import styled from "styled-components";

export const Spinner = styled(IonSpinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;
