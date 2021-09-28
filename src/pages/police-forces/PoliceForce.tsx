import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { IonContent, IonPage } from "@ionic/react";

import { Spinner } from "../../components/Spinner";
import { Map } from "./components/Map";
import { InformationPopup } from "./components/InformationPopup";
import { PostcodeSearch } from "../../components/PostcodeSearch";
import { getPoliceForceNameAndBoundary } from "../../redux/actions/mapActions";

const Index: React.FC = () => {
  const dispatch = useDispatch();
  
  const [mapBusy, setMapBusy] = useState<boolean>(false);

  return (
    <IonPage>
      <Content fullscreen>
        {mapBusy && <Spinner name="crescent" color="secondary" />}
        <Map
          onLoading={(loading: boolean) => setMapBusy(loading)}
        />
        <PostcodeSearch
          placeholder="Search Police Force by postcode"
          onSelect={(postcode: string) => dispatch(getPoliceForceNameAndBoundary(postcode))}
        />
        <InformationPopup />
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
