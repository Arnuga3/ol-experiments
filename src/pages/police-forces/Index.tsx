import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonListHeader,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { shieldOutline } from "ionicons/icons";

import {
  getPoliceForceNameAndBoundary,
  getPoliceForcesList,
} from "../../redux/actions/policeDataActions";
import { usePoliceData } from "../../hooks/policeDataHook";

import { PostcodeSearch } from "../../components/PostcodeSearch";
import { Spinner } from "../../components/Spinner";

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { forces, policeForceName } = usePoliceData();

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getPoliceForcesList());
  }, []);

  useEffect(() => {
    if (history && policeForceName) {
      setLoading(false);
      history.push(`/police-force/${policeForceName}`);
    }
  }, [policeForceName]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <PostcodeSearch
            placeholder="Search by postcode"
            onSelect={(postcode: string) => {
              setLoading(true);
              dispatch(getPoliceForceNameAndBoundary(postcode));
            }}
          />
        </IonToolbar>
      </IonHeader>
      <Content fullscreen>
        {loading && <Spinner name="crescent" color="secondary" />}
        <List lines="none">
          <IonListHeader>
            <b>Police Forces</b>
          </IonListHeader>
          {forces.map((force: { id: string; name: string }) => (
            <IonItem key={force.id} routerLink={`/police-force/${force.id}`}>
              <IonIcon icon={shieldOutline} slot="start" color="medium" />
              {force.name}
            </IonItem>
          ))}
        </List>
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

const List = styled(IonList)`
  z-index: 1;
`;
