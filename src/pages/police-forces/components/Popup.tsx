import { useEffect, useState } from "react";
import styled from "styled-components";

import { IonButton, IonButtons, IonIcon, IonText } from "@ionic/react";
import { closeCircleOutline, informationCircleSharp } from "ionicons/icons";
import { Spinner } from "../../../components/Spinner";

import { policeApiService } from "../../../services/PoliceApiService";

interface Props {
  force: string;
}

interface PopupState {
  data: any;
  loading: boolean;
  open:  boolean;
}

export const Popup: React.FC<Props> = ({ force }) => {
  const [state, setState] = useState<PopupState>({
    data: null,
    loading: false,
    open: false,
  });

  const { data, loading, open } = state;

  useEffect(() => {
    if (force) {
      retrieveForce(force);
    }
  }, [force]);

  const retrieveForce = async (force: string) => {
    setState({ ...state, loading: true, open: true });
    const forceData = await policeApiService.getForce(force);
    setState({
      ...state,
      data: forceData,
      loading: false,
    });
  };

  return open ? (
    <Wrapper>
      <Content>
        <CloseIcon>
          <IonIcon
            icon={closeCircleOutline}
            onClick={() => setState({ ...state, open: false })}
          />
        </CloseIcon>
        {loading && <Spinner name="crescent" color="secondary" />}
        {data && (
          <>
            {data.name && (
              <IonText>
                <h4>{data.name}</h4>
              </IonText>
            )}
            <Cards>
              {data.engagement_methods &&
                data.engagement_methods.map((method: any, index: number) => (
                  <CardButton href={method.url} key={index}>
                    <IonIcon color="secondary" icon={method.icon} />
                    <IonText>
                      <small>{method.name}</small>
                    </IonText>
                  </CardButton>
                ))}
            </Cards>
          </>
        )}
      </Content>
    </Wrapper>
  ) : (
    <ForceInfoButton>
      <IonButton onClick={() => setState({ ...state, open: true })}>
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
