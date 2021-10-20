import { useState } from "react";
import styled from "styled-components";

import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";

import { Spinner } from "../../components/Spinner";
import { PostcodeSearch } from "../../components/PostcodeSearch";
import { Map } from "./components/Map";
import { useDispatch } from "react-redux";
import { getCrimesByPostcode } from "../../redux/actions/police/crimesActions";

const Index: React.FC = () => {
  const dispatch = useDispatch();

  const [mapBusy, setMapBusy] = useState<boolean>(false);

  return (
    <IonPage>
    <IonHeader className="ion-no-border">
      <IonToolbar>
        <PostcodeSearch
          placeholder="Search by postcode"
          onSelect={async (postcode: string) => dispatch(getCrimesByPostcode(postcode))}
        />
      </IonToolbar>
    </IonHeader>
      <Content fullscreen>
        {mapBusy && <Spinner name="crescent" color="secondary" />}
        <Map
          onLoading={(loading: boolean) => setMapBusy(loading)}
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
