import styled from "styled-components";
import { IonIcon, IonText } from "@ionic/react";

interface Props {
  data: any;
}

const EngagementMethods: React.FC<Props> = ({ data }) => {
  return (
    <Methods>
      {data.map((method: any, index: number) => (
        <Link href={method.url} key={index}>
          <Icon color="secondary" icon={method.icon} />
          <Text>
            <small>{method.name}</small>
          </Text>
        </Link>
      ))}
    </Methods>
  );
};

export default EngagementMethods;

const Methods = styled.div`
  margin: 12px 0;
  padding: 12px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  flex-wrap: nowrap;
`;

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75px;
  margin-right: 28px;
  text-decoration: none;
`;

const Icon = styled(IonIcon)`
  margin-bottom: 8px;
  font-size: 32px;
`;

const Text = styled(IonText)`
  height: 60%;
`;
