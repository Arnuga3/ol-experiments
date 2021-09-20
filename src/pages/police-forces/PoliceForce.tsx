import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import styled from "styled-components";
import { Spinner } from "../../components/Spinner";

import { Map } from "./components/Map";
import { Popup } from "./components/Popup";
import { Search } from "./components/Search";

const Index: React.FC = () => {
  const [postcode, setPostcode] = useState<string | null>(null);
  const [mapBusy, setMapBusy] = useState<boolean>(false);
  const [force, setForce] = useState<string | null>(null);

  return (
    <IonPage>
      <Content fullscreen>
        {mapBusy && <Spinner name="crescent" color="secondary" />}
        <Map
          postcode={postcode}
          onLoading={(loading: boolean) => setMapBusy(loading)}
          onForceFound={(force) => setForce(force)}
        />
        <Search onSelect={(postcode: string | null) => setPostcode(postcode)} />
        {force && !mapBusy && <Popup force={force} />}
      </Content>
    </IonPage>
  );
};

export default Index;

const Content = styled(IonContent)`
  text-align: center;
  position: relative;
  z-index: 1;
`;
