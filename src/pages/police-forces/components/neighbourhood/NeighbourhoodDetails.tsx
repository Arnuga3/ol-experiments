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
  flex-direction: column;
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(IonIcon)`
  margin-bottom: 12px;
  margin-right: 12px;
  font-size: 32px;
`;

const Text = styled(IonText)`
  height: 60%;
`;
