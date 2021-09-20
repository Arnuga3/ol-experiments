import { IonIcon, IonText } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Spinner } from "../../../components/Spinner";
import { policeApiService } from "../../../services/PoliceApiService";

interface Props {
  force: string;
}

export const Popup: React.FC<Props> = ({ force }) => {
  const [forceInfo, setForceInfo] = useState<any>(null);
  const [loading, setLoading] = useState<any>(null);
  const [open, setOpen] = useState<any>(true);

  useEffect(() => {
    if (force) {
      retrieveForce(force);
    }
  }, [force]);

  const retrieveForce = async (force: string) => {
    setLoading(true);
    const data = await policeApiService.getForce(force);
    setForceInfo(data);
    setOpen(true);
    setLoading(false);
  };

  return open ? (
    <Wrapper>
      <Content>
        <CloseIcon>
          <IonIcon icon={closeCircleOutline} onClick={() => setOpen(false)}/>
        </CloseIcon>
        {loading && <Spinner name="crescent" color="secondary" />}
        {forceInfo && (
          <>
            {forceInfo.name && (
              <IonText>
                <h4>{forceInfo.name}</h4>
              </IonText>
            )}
            <Cards>
              {forceInfo.engagement_methods &&
                forceInfo.engagement_methods.map(
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
  ) : null;
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
  top: 18px
`;
