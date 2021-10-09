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
  getPoliceForceFromPostcode,
  getPoliceForcesList,
} from "../../redux/actions/policeDataActions";
import { usePoliceData } from "../../hooks/policeDataHook";

import { PostcodeSearch } from "../../components/PostcodeSearch";

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { forces } = usePoliceData();

  useEffect(() => {
    dispatch(getPoliceForcesList());
  }, []);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <PostcodeSearch
            placeholder="Search by postcode"
            onSelect={(postcode: string) => {
              dispatch(getPoliceForceFromPostcode(postcode, history));
            }}
          />
        </IonToolbar>
      </IonHeader>
      <Content fullscreen>
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
