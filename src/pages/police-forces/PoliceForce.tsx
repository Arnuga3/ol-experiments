import { useState } from "react";
import { useDispatch } from "react-redux";
import { usePoliceForce } from "../../hooks/police/policeForceHook";
import styled from "styled-components";

import {
  IonBackButton,
  IonButtons,
  IonCard,
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

import { informationOutline, mapOutline, shieldOutline } from "ionicons/icons";

import { RouteComponentProps } from "react-router-dom";

import { ForceMap } from "./components/force/ForceMap";
import EngagementMethods from "./components/force/EngagementMethods";
import NeighbourhoodsList from "./components/neighbourhood/NeighbourhoodsList";

import { getPoliceForce } from "../../redux/actions/police/policeForceActions";
import { Spinner } from "../../components/Spinner";
import { useLoader } from "../../hooks/loaderHook";

interface PoliceForceProps extends RouteComponentProps<{ id: string }> {}

const PoliceForce: React.FC<PoliceForceProps> = ({ match }) => {
  const forceId = match.params.id;
  const [segment, setSegment] = useState<string>("map");

  const dispatch = useDispatch();
  const force = usePoliceForce(forceId);
  const { loading } = useLoader();

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
        {force ? (
          <Wrapper>
            <Block>
              <IonText>
                <h4>{force.name}</h4>
              </IonText>
            </Block>

            {loading ? (
              <Spinner name="crescent" color="secondary" />
            ) : (
              force.data?.engagement_methods && (
                <EngagementMethods data={force.data.engagement_methods} />
              )
            )}

            <IonCard>
              <IonSegment
                value={segment}
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
                    <IonIcon icon={informationOutline} />
                  </IonSegmentButton>
                )}
              </IonSegment>
            </IonCard>

            {segment === "map" && (
              <MapContainer>
                <ForceMap forceId={force.id} />
              </MapContainer>
            )}

            {segment === "description" && (
              <Block>
                <IonText>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: force.data?.description,
                    }}
                  />
                </IonText>
              </Block>
            )}

            {segment === "neighborhoods" && (
              <NeighbourhoodsList forceId={force.id} />
            )}
          </Wrapper>
        ) : (
          <Spinner name="crescent" color="secondary" />
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
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Block = styled.div`
  padding: 0 16px;
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`;
