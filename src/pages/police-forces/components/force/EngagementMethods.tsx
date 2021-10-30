import styled from "styled-components";
import { IonIcon, IonText } from "@ionic/react";

interface Props {
  data: any;
}

const EngagementMethods: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default EngagementMethods;

const Wrapper = styled.div`
  display: flex;
`;

const Methods = styled.div`
  padding: 12px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  flex-wrap: nowrap;
  background-image: linear-gradient(to right, white, white),
    linear-gradient(to right, white, white),
    linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0)),
    linear-gradient(to left, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0));
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: white;
  background-size: 20px 100%, 20px 100%, 10px 100%, 10px 100%;
  background-attachment: local, local, scroll, scroll;
`;

const Link = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 28px;
  text-decoration: none;
  text-align: center;
`;

const Icon = styled(IonIcon)`
  margin-bottom: 8px;
  font-size: 32px;
`;

const Text = styled(IonText)`
  height: 60%;
`;
