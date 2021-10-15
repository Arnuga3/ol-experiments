import { useState } from "react";
import { useDispatch } from "react-redux";
import { usePoliceForce } from "../../hooks/police/policeForceHook";
import styled from "styled-components";

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";

import {
  informationCircleOutline,
  mapOutline,
  shieldOutline,
} from "ionicons/icons";

import { RouteComponentProps } from "react-router-dom";

import { ForceMap } from "./components/force/ForceMap";
import EngagementMethods from "./components/force/EngagementMethods";
import NeighbourhoodsList from "./components/neighbourhood/NeighbourhoodsList";

import { getPoliceForce } from "../../redux/actions/police/policeForceActions";

interface PoliceForceProps extends RouteComponentProps<{ id: string }> {}

const PoliceForce: React.FC<PoliceForceProps> = ({ match }) => {
  const forceId = match.params.id;
  const [segment, setSegment] = useState<string | null>("map");

  const dispatch = useDispatch();
  const force = usePoliceForce(forceId);

  useIonViewDidEnter(() => {
    if (forceId && !force.data) {
      dispatch(getPoliceForce(forceId));
    }
  });

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Content fullscreen>
        {force && (
          <Wrapper>
            <IonText>
              <h3>{force.name}</h3>
            </IonText>
            {force.data?.engagement_methods && (
              <EngagementMethods data={force.data.engagement_methods} />
            )}

            <IonSegment
              color="secondary"
              onIonChange={(e: any) => setSegment(e.detail.value)}
            >
              <IonSegmentButton value="map">
                <IonIcon icon={mapOutline} />
              </IonSegmentButton>
              <IonSegmentButton value="neighborhoods">
                <IonIcon icon={shieldOutline} />
              </IonSegmentButton>
              {force.data?.description && (
                <IonSegmentButton value="description">
                  <IonIcon icon={informationCircleOutline} />
                </IonSegmentButton>
              )}
            </IonSegment>

            {segment === "map" && (
              <MapContainer>
                <ForceMap forceId={force.id} />
              </MapContainer>
            )}

            {segment === "description" && (
              <IonText color="medium">
                <p dangerouslySetInnerHTML={{ __html: force.data?.description }} />
              </IonText>
            )}

            {segment === "neighborhoods" && (
              <NeighbourhoodsList forceId={force.id} />
            )}
          </Wrapper>
        )}
      </Content>
    </IonPage>
  );
};

export default PoliceForce;

const Content = styled(IonContent)`
  position: relative;
  z-index: 1;
`;

const Wrapper = styled.div`
  padding: 16px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 300px;
`;
