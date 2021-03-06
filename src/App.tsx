import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import PoliceForces from "./pages/police-forces/Index";
import Crimes from "./pages/crimes/Crimes";
import { shieldOutline, skullOutline } from "ionicons/icons";
import PoliceForce from "./pages/police-forces/PoliceForce";
import PoliceForceNeighbourhood from "./pages/police-forces/PoliceForceNeighbourhood";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPoliceForcesList } from "./redux/actions/police/policeForceActions";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getPoliceForcesList());
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/:tab(police-force)">
              <PoliceForces />
            </Route>
            <Route
              exact
              path="/:tab(police-force)/:id"
              component={PoliceForce}
            />
            <Route
              exact
              path="/:tab(police-force)/:id/neighbourhood/:id"
              component={PoliceForceNeighbourhood}
            />
            <Route exact path="/:tab(crimes)">
              <Crimes />
            </Route>
            <Route exact path="/">
              <Redirect from="/" to="/crimes" />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="police-force" href="/police-force">
              <IonIcon icon={shieldOutline} />
            </IonTabButton>
            <IonTabButton tab="crimes" href="/crimes">
              <IonIcon icon={skullOutline} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
