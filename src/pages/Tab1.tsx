import { IonContent, IonPage, IonSearchbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import styled from "styled-components";

import Map from "../components/MapWrapper";
import { NeighbourhoodLocated } from "../interfaces/PoliceApi";
import { policeApiService } from "../services/PoliceApiService";
import { postcodeApiService } from "../services/PostcodeApiService";

const Tab1: React.FC = () => {
  const [boundary, setBoundary] = useState<any>();

  const onSearch = async (e: any) => {
    const input = e.detail.value;

    if (input && input.length > 7) {

      const result = await postcodeApiService.getPostcode(
        input.replace(/\s/g, "")
      );

      if (result) {

        const { force, neighbourhood }: NeighbourhoodLocated =
          await policeApiService.locateNeighbourhood(
            result.latitude,
            result.longitude
          );

        const neighbourhoodBoundary =
          await policeApiService.getNeighbourhoodBoundary(force, neighbourhood);

          if (neighbourhoodBoundary) {
            setBoundary(
              neighbourhoodBoundary.map((point: any) => [
                +point.longitude,
                +point.latitude,
              ])
            );
          }

      }
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Map boundary={boundary} />
        <Searchbar
          type="search"
          enterkeyhint="search"
          inputMode="search"
          debounce={500}
          clearIcon={closeCircleOutline}
          onIonChange={onSearch}
          placeholder={"Search by postcode"}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

const Searchbar = styled(IonSearchbar)`
  position: absolute;
  top: 0;
`;
