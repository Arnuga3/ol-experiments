import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePoliceNeighbourhood } from "../../hooks/police/policeNeighbourhoodHook";
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
} from "@ionic/react";

import {
  getPoliceNeighbourhood,
  getPoliceNeighbourhoodBoundary,
} from "../../redux/actions/police/policeNeighbourhoodActions";

import { RouteComponentProps } from "react-router-dom";
import { NeighbourhoodMap } from "./components/neighbourhood/NeighbourhoodMap";
import {
  mapOutline,
  informationCircleOutline,
  skullOutline,
} from "ionicons/icons";
import NeighbourhoodDetails from "./components/neighbourhood/NeighbourhoodDetails";
import NeighbourhoodCrimes from "./components/neighbourhood/NeighbourhoodCrimes";

interface PoliceForceNeighbourhoodProps
  extends RouteComponentProps<{ id: string }> {}

const PoliceForceNeighbourhood: React.FC<PoliceForceNeighbourhoodProps> = ({
  match,
  history,
}) => {
  const neighbourhoodId = match.params.id;
  const dispatch = useDispatch();

  const [segment, setSegment] = useState<string | null>("map");
  const neighbourhood = usePoliceNeighbourhood(neighbourhoodId);

  useEffect(() => {
    if (!neighbourhood) {
      history.goBack();
    }
    if (neighbourhood && !neighbourhood.data) {
      dispatch(getPoliceNeighbourhood(neighbourhood.forceId, neighbourhoodId));
    }
    if (neighbourhood && !neighbourhood.boundary) {
      dispatch(
        getPoliceNeighbourhoodBoundary(neighbourhood.forceId, neighbourhoodId)
      );
    }
  }, [neighbourhood]);

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
        {neighbourhood && (
          <Wrapper>
            <IonText>
              <h3>{neighbourhood.name}</h3>
            </IonText>

            {neighbourhood && neighbourhood.data && (
              <>
                {neighbourhood.data.details && (
                  <NeighbourhoodDetails data={neighbourhood.data.details} />
                )}

                <IonSegment
                  color="secondary"
                  onIonChange={(e: any) => setSegment(e.detail.value)}
                >
                  <IonSegmentButton value="map">
                    <IonIcon icon={mapOutline} />
                  </IonSegmentButton>
                  {neighbourhood.data.description && (
                    <IonSegmentButton value="description">
                      <IonIcon icon={informationCircleOutline} />
                    </IonSegmentButton>
                  )}
                  <IonSegmentButton value="crimes">
                    <IonIcon icon={skullOutline} />
                  </IonSegmentButton>
                </IonSegment>

                {segment === "map" && (
                  <MapContainer>
                    <NeighbourhoodMap
                      forceId={neighbourhood.forceId}
                      boundary={neighbourhood.boundary}
                      centre={neighbourhood.data.centre}
                    />
                  </MapContainer>
                )}

                {segment === "description" && (
                  <IonText color="medium">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: neighbourhood.data.description,
                      }}
                    />
                  </IonText>
                )}

                {segment === "crimes" && <NeighbourhoodCrimes />}
              </>
            )}
          </Wrapper>
        )}
      </Content>
    </IonPage>
  );
};

export default PoliceForceNeighbourhood;

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
