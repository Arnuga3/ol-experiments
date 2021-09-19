import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import styled from "styled-components";

import { IndexMap } from "../components/IndexMap";
import Search from "./Search";

const Index: React.FC = () => {
  const [postcode, setPostcode] = useState<string | null>(null);

  return (
    <IonPage>
      <Content fullscreen>
        <IndexMap postcode={postcode} />
        <Search onSelect={(postcode: string | null) => setPostcode(postcode)} />
      </Content>
    </IonPage>
  );
};

export default Index;

const Content = styled(IonContent)`
  text-align: center;
`;
