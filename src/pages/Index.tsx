import { IonContent, IonPage, IonSearchbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import styled from "styled-components";

import Map from "../components/IndexMap";

const Tab1: React.FC = () => {
  const [search, setSearch] = useState<string | null>(null);

  const onSearch = async (e: any) => {
    const input = e.detail.value;

    if (input && input.length > 7) {

      setSearch(input);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <Map search={search} />
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
