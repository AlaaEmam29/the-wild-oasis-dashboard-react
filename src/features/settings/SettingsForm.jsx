import React from "react";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { styled } from "styled-components";
import Form from "../../ui/Form";
import { useSettings } from "./useSettings";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useUpdateSettings } from "./useUpdateSettings";
const StyledContainer = styled.div`
  padding: 2.4rem 4rem;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: 1.4rem;
`;
export default function SettingsForm() {
  const { isLoading, error, settings } = useSettings();
  const { isUpdating, updateSettings } = useUpdateSettings();

  const { id, created_at, ...settingValues } = settings;
  const { register } = useForm({
    defaultValues: settingValues,
  });

  const handleUpdateSettings = (e) => {
    const { value, name } = e.target;
    if (!value) return;
    updateSettings({ [name]: value });
  };
  const isWorking = isLoading || isUpdating;

  return (
    <StyledContainer>
      <Form>
        <FormRow label="Minimum nights/booking">
          <Input
            type="number"
            id="minBookingLength"
            {...register("minBookingLength")}
            onBlur={handleUpdateSettings}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Maximum nights/booking">
          <Input
            type="number"
            id="maxBookingLength"
            {...register("maxBookingLength")}
            onBlur={handleUpdateSettings}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Maximum guests/booking">
          <Input
            type="number"
            id="maxGuestPerBookings"
            {...register("maxGuestPerBookings")}
            onBlur={handleUpdateSettings}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Breakfast price">
          <Input
            type="number"
            id="breakfastPrice"
            {...register("breakfastPrice")}
            onBlur={handleUpdateSettings}
            disabled={isWorking}
          />
        </FormRow>
      </Form>
    </StyledContainer>
  );
}
