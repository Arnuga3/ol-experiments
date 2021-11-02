import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePoliceNeighbourhood } from "../../hooks/police/policeNeighbourhoodHook";
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
import { usePoliceForce } from "../../hooks/police/policeForceHook";

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
  const force = usePoliceForce(neighbourhood?.forceId);

  useEffect(() => {
    if (!neighbourhood) {
      history.goBack();
    }
    if (neighbourhood && !neighbourhood.data) {
      dispatch(getPoliceNeighbourhood(neighbourhood.forceId, neighbourhoodId));
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
            <Block>
              <IonText>
                <small>{`${force?.name}`}</small>
                <h4 dangerouslySetInnerHTML={{ __html: neighbourhood.name }} />
              </IonText>
            </Block>

            {neighbourhood && neighbourhood.data && (
              <>
                <IonCard>
                  <IonSegment
                    value={segment}
                    color="secondary"
                    onIonChange={(e: any) => setSegment(e.detail.value)}
                  >
                    <IonSegmentButton value="map">
                      <IonIcon icon={mapOutline} />
                    </IonSegmentButton>
                    <IonSegmentButton value="crimes">
                      <IonIcon icon={skullOutline} />
                    </IonSegmentButton>
                    {neighbourhood.data.description && (
                      <IonSegmentButton value="description">
                        <IonIcon icon={informationCircleOutline} />
                      </IonSegmentButton>
                    )}
                  </IonSegment>
                </IonCard>

                {segment === "map" && (
                  <MapContainer>
                    <NeighbourhoodMap neighbourhoodId={neighbourhoodId} />
                  </MapContainer>
                )}

                {segment === "description" && (
                  <Block>
                    <IonText>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: neighbourhood.data.description,
                        }}
                      />
                    </IonText>
                    {neighbourhood.data.details && (
                      <NeighbourhoodDetails data={neighbourhood.data.details} />
                    )}
                  </Block>
                )}
                <Block>{segment === "crimes" && <NeighbourhoodCrimes />}</Block>
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
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Block = styled.div`
  padding: 0 16px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;
