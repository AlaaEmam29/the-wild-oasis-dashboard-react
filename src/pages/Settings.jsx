import React from "react";
import SettingsHeader from "../features/settings/SettingsHeader";
import Row from "../ui/Row";
import SettingsForm from "../features/settings/SettingsForm";
import Loader from "../ui/Loader";
import { useSettings } from "../features/settings/useSettings";

export default function Settings() {
  const { isLoading } = useSettings();
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <SettingsHeader />
      <Row>
        <SettingsForm />
      </Row>
    </>
  );
}
