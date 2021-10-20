import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMap } from "../../../../hooks/mapHook";
import { usePoliceData } from "../../../../hooks/police/policeDataHook";
import { getCrimesForArea } from "../../../../redux/actions/police/crimesActions";

const NeighbourhoodCrimes: React.FC = () => {
  const dispatch = useDispatch();
  const { corners } = useMap();
  const { crimes } = usePoliceData();

  useEffect(() => {
    if (corners) {
      dispatch(getCrimesForArea(corners));
    }
  }, [corners]);
  return <p>{`Crimes count: ${crimes ? crimes.length : 0}`}</p>;
};

export default NeighbourhoodCrimes;
