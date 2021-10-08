import { useState } from "react";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { mapOutline } from "ionicons/icons";
import { getPoliceForce } from "../../../redux/actions/policeDataActions";
import { usePoliceData } from "../../../hooks/policeDataHook";
import { Map } from "./Map";
import EngagementMethods from "./EngagementMethods";

interface PoliceForceProps extends RouteComponentProps<{ id: string }> {}

const PoliceForce: React.FC<PoliceForceProps> = ({ match }) => {
  const dispatch = useDispatch();
  const { force } = usePoliceData();

  const [segment, setSegment] = useState<string | null>("map");
  const forceId = match.params.id;

  useIonViewWillEnter(() => {
    if (forceId) {
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
              <b>{force.name}</b>
            </IonText>
            {force.engagement_methods && (
              <EngagementMethods data={force.engagement_methods} />
            )}

            <IonSegment
              color="secondary"
              onIonChange={(e: any) => setSegment(e.detail.value)}
            >
              <IonSegmentButton value="map">
                <IonIcon icon={mapOutline} />
              </IonSegmentButton>
              {force.description && (
                <IonSegmentButton value="description">
                  <IonLabel>Description</IonLabel>
                </IonSegmentButton>
              )}
            </IonSegment>

            {segment === "map" && (
              <MapContainer>
                <Map forceId={forceId} />
              </MapContainer>
            )}

            {segment === "description" && (
              <IonText color="medium">
                <small
                  dangerouslySetInnerHTML={{ __html: force.description }}
                />
              </IonText>
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
`;

const MapContainer = styled.div`
  width: 100%;
  height: 250px;
`;
