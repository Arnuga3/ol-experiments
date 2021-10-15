import styled from "styled-components";
import { IonIcon, IonText } from "@ionic/react";

interface Props {
  data: any;
}

const NeighbourhoodDetails: React.FC<Props> = ({ data }) => {
  return (
    <Wrapper>
      <Details>
        {data.map((detail: any, index: number) =>
          detail.url ? (
            <Link href={detail.url} key={index}>
              <Icon color="secondary" icon={detail.icon} />
              <Text>
                <small>{detail.name}</small>
              </Text>
            </Link>
          ) : (
            <Detail key={index}>
              <Icon color="secondary" icon={detail.icon} />
              <small dangerouslySetInnerHTML={{ __html: detail.name }} />
            </Detail>
          )
        )}
      </Details>
    </Wrapper>
  );
};

export default NeighbourhoodDetails;

const Wrapper = styled.div`
  display: flex;
`;

const Details = styled.div`
  margin: 12px 0;
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

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 28px;
`;

const Icon = styled(IonIcon)`
  margin-bottom: 8px;
  font-size: 32px;
`;

const Text = styled(IonText)`
  height: 60%;
`;
