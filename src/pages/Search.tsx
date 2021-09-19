import {
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
} from "@ionic/react";
import {
  closeCircleOutline,
  locateOutline,
  locationOutline,
} from "ionicons/icons";
import { useState } from "react";
import styled from "styled-components";

import { postcodeApiService } from "../services/PostcodeApiService";

interface Props {
  onSelect: (postcode: string | null) => void;
}

const NOT_FOUND = "Not Found";

const Search: React.FC<Props> = ({ onSelect }) => {
  const [state, setState] = useState<any>({
    searchInput: null,
    needOptions: true, // When a postcode is selected from a list, there is no need to retrieve suggestions
    postcodeOptions: [],
  });

  const { searchInput, needOptions, postcodeOptions } = state;

  const search = async (e: any) => {
    const input = e.detail.value;

    if (input.length > 2 && needOptions) {
      const options = await postcodeApiService.getPostcodeSuggetions(input);

      setState({
        ...state,
        searchInput: input,
        postcodeOptions: options ? options : [NOT_FOUND],
      });
    } else {
      setState({ ...state, searchInput: input, needOptions: true });
    }
  };

  const clear = () => {
    setState({
      ...state,
      searchInput: null,
      postcodeOptions: [],
    });
    onSelect(null);
  };

  const select = (option: string) => {
    setState({
      ...state,
      searchInput: option,
      needOptions: false,
      postcodeOptions: [],
    });
    onSelect(option);
  };

  return (
    <Toolbar>
      <Searchbar
        value={searchInput}
        type="search"
        enterkeyhint="search"
        inputMode="search"
        debounce={500}
        searchIcon={locationOutline}
        clearIcon={closeCircleOutline}
        onIonChange={search}
        onIonClear={clear}
        placeholder={"Search by postcode"}
      />
      {postcodeOptions.length > 0 && (
        <List>
          {postcodeOptions.map((option: string, index: number) =>
            option === NOT_FOUND ? (
              NOT_FOUND
            ) : (
              <ListItem
                key={index}
                lines="none"
                button
                onClick={() => select(option)}
              >
                <IonIcon slot="start" icon={locateOutline} color="medium" />
                <IonLabel>{option}</IonLabel>
              </ListItem>
            )
          )}
        </List>
      )}
    </Toolbar>
  );
};

export default Search;

const Searchbar = styled(IonSearchbar)`
  padding: 0;
  --border-radius: 25px;
  --icon-color: var(--ion-color-light);
  --color: var(--ion-color-light);
  --box-shadow: 0 4px 4px 1px rgba(0, 0, 0, 0.1);
  --background: var(--ion-color-secondary-shade);
  text-align: left;
`;

const Toolbar = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 6px;
`;

const List = styled(IonList)`
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
  margin: 6px;
  max-width: 500px;
  border-radius: 25px;
  text-align: center;
  width: 100%;
`;

const ListItem = styled(IonItem)`
  width: 100%;
`;
