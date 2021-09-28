import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { IonButton, IonButtons, IonIcon, IonText } from "@ionic/react";
import { closeCircleOutline, informationCircleSharp } from "ionicons/icons";

import { getPoliceForceInformation } from "../../../redux/actions/mapActions";
import { useMap } from "../../../hooks/mapHook";

export const InformationPopup: React.FC = () => {
  const dispatch = useDispatch();
  const { policeForceName, policeForce } = useMap();

  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (policeForceName) {
      dispatch(getPoliceForceInformation(policeForceName));   // 2. Retrieve data
    }
  }, [policeForceName]);  // 1. Listen for changes

  useEffect(() => {
    if (policeForce) {
      setOpen(true);  // 4. Open popup to display data (if closed)
    }
  }, [policeForce]);  // 3. Listen for data changes

  return open ? (
    <Wrapper>
      <Content>
        <CloseIcon>
          <IonIcon icon={closeCircleOutline} onClick={() => setOpen(false)} />
        </CloseIcon>
        {policeForce && (
          <>
            {policeForce.name && (
              <IonText>
                <h4>{policeForce.name}</h4>
              </IonText>
            )}
            <Cards>
              {policeForce.engagement_methods &&
                policeForce.engagement_methods.map(
                  (method: any, index: number) => (
                    <CardButton href={method.url} key={index}>
                      <IonIcon color="secondary" icon={method.icon} />
                      <IonText>
                        <small>{method.name}</small>
                      </IonText>
                    </CardButton>
                  )
                )}
            </Cards>
          </>
        )}
      </Content>
    </Wrapper>
  ) : (
    <ForceInfoButton>
      <IonButton onClick={() => setOpen(true)}>
        <IonIcon
          slot="icon-only"
          color="secondary"
          icon={informationCircleSharp}
        />
      </IonButton>
    </ForceInfoButton>
  );
};

const Wrapper = styled.div`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 55px;
  padding: 6px;
  max-width: 500px;
`;

const Content = styled.div`
  background-color: white;
  max-width: 500px;
  min-height: 200px;
  max-height: 500px;
  border-radius: 25px;
  box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  flex: 1;
`;

const CardButton = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 65px;
  margin: 4px;
  text-decoration: none;
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 18px;
`;

const ForceInfoButton = styled(IonButtons)`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 55px;
  padding: 6px;
  max-width: 500px;
  display: flex;
  justify-content: flex-end;
`;
