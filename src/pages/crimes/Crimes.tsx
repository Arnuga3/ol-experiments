import { useState } from "react";
import styled from "styled-components";

import { IonContent, IonPage } from "@ionic/react";

import { Spinner } from "../../components/Spinner";
import { PostcodeSearch } from "../../components/PostcodeSearch";
import { Map } from "./components/Map";

const Index: React.FC = () => {
  const [postcode, setPostcode] = useState<string | null>(null);
  const [mapBusy, setMapBusy] = useState<boolean>(false);
  const [crimes, setCrimes] = useState<any>(null);

  return (
    <IonPage>
      <Content fullscreen>
        {mapBusy && <Spinner name="crescent" color="secondary" />}
        <Map
          postcode={postcode}
          onLoading={(loading: boolean) => setMapBusy(loading)}
          onData={(data) => setCrimes(data)}
        />
        <PostcodeSearch
          placeholder="Search Crimes by postcode"
          onSelect={(postcode: string | null) => setPostcode(postcode)}
        />
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
