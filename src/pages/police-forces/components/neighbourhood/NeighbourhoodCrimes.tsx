import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "../../../../components/Spinner";
import { useLoader } from "../../../../hooks/loaderHook";
import { useMap } from "../../../../hooks/mapHook";
import { usePoliceData } from "../../../../hooks/police/policeDataHook";
import { getCrimesForArea } from "../../../../redux/actions/police/crimesActions";

const NeighbourhoodCrimes: React.FC = () => {
  const dispatch = useDispatch();
  const { corners } = useMap();
  const { crimes, crimesGrouped } = usePoliceData();
  const { loading } = useLoader();

  useEffect(() => {
    if (corners && !crimes) {
      dispatch(getCrimesForArea(corners));
    }
  }, [corners, crimes]);

  return loading ? (
    <Spinner name="crescent" color="secondary" />
  ) : (
    <>
      <p>{`Data for: ${crimes ? crimes[0].month : "---"}`}</p>
      <p>{`Total crimes: ${crimes ? crimes.length : 0}`}</p>
      <ul>
        {crimesGrouped &&
          Object.keys(crimesGrouped).map((crimeGroup: any) => (
            <li
              key={crimeGroup}
            >{`${crimeGroup} (${crimesGrouped[crimeGroup].length})`}</li>
          ))}
      </ul>
    </>
  );
};

export default NeighbourhoodCrimes;
