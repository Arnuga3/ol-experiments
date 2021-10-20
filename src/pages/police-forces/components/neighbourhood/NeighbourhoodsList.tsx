import { IonIcon, IonItem, IonList, IonListHeader } from "@ionic/react";
import { shieldOutline } from "ionicons/icons";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPoliceForceNeighbourhoodsList } from "../../../../redux/actions/police/policeNeighbourhoodActions";
import { usePoliceForce } from "../../../../hooks/police/policeForceHook";

interface Props {
  forceId: any;
}

const NeighbourhoodsList: React.FC<Props> = ({ forceId }) => {
  const dispatch = useDispatch();
  const force = usePoliceForce(forceId);
  const data = force.neighbourhoods;

  useEffect(() => {
    if (forceId && !data) {
      dispatch(getPoliceForceNeighbourhoodsList(forceId));
    }
  }, [forceId]);

  return (
    <div>
      <IonList lines="none">
        <IonListHeader>
          <b>Neighbourhoods</b>
        </IonListHeader>
        {data &&
          data.map((neighbourhood: { id: string; name: string }) => (
            <IonItem
              key={neighbourhood.id}
              routerLink={`/police-force/${forceId}/neighbourhood/${neighbourhood.id}`}
            >
              <IonIcon icon={shieldOutline} slot="start" color="secondary" />
              {neighbourhood.name}
            </IonItem>
          ))}
      </IonList>
    </div>
  );
};

export default NeighbourhoodsList;
