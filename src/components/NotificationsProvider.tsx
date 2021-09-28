import { useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNotifications } from "../hooks/notificationsHook";
import { hideMotification } from "../redux/actions/notificationsActions";
import { Notification } from "../redux/reducers/notificationsReducer";

export const NotificationsProvider: React.FC = () => {
  const dispatch = useDispatch();
  const [present] = useIonToast();

  const [onDisplay, setOnDisplay] = useState<string[]>([]);

  const { notifications } = useNotifications();

  useEffect(() => {
    notifications.forEach((notification) => {
      show(notification);
      setTimeout(() => hide(notification), notification.duration);
    });
  }, [notifications]);

  const show = (notification: Notification) => {
    present(notification);
    setOnDisplay([notification.id, ...onDisplay]);
  };

  const hide = (notification: Notification) => {
    dispatch(hideMotification(notification.id));
    setOnDisplay(onDisplay.filter((id: string) => id !== notification.id));
  };

  return null;
};
