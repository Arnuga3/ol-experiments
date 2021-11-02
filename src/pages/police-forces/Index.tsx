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
import { shieldCheckmarkOutline } from "ionicons/icons";

import { usePoliceData } from "../../hooks/police/policeDataHook";

import { PostcodeSearch } from "../../components/PostcodeSearch";
import { policeForceService } from "../../services/policeApiServices/PoliceForce";

const Index: React.FC = () => {
  const history = useHistory();
  const { forces } = usePoliceData();

  const findForceByPostcode = async (postcode: string) => {
    const forceId = await policeForceService.findByPostcode(postcode);
    if (forceId) {
      history.push(`/police-force/${forceId}`);
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <PostcodeSearch
            placeholder="Search by postcode"
            onSelect={async (postcode: string) => findForceByPostcode(postcode)}
          />
        </IonToolbar>
      </IonHeader>
      <Content fullscreen>
        <Wrapper>
          <IonList lines="none">
            <IonListHeader>
              <b>UK Police Forces</b>
            </IonListHeader>
            {forces.map((force: { id: string; name: string }) => (
              <IonItem key={force.id} routerLink={`/police-force/${force.id}`}>
                <IonIcon icon={shieldCheckmarkOutline} slot="start" color="secondary"/>
                {force.name}
              </IonItem>
            ))}
          </IonList>
        </Wrapper>
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

const Wrapper = styled.div`
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
`;
