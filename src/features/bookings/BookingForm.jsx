import Model from "../../ui/Model";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import CancelModelButton from "../../ui/CancelModelButton";
import CloseButton from "../../ui/CloseButton";

const requiredField = { required: "This field is required" };
export default function BookingForm({ closeModel }) {
  return (
    <>
      <CloseButton />
      <Model.Window>
        <Form model="true">
          <FormRow label="Cabin name">
            <Input type="text" id="name" />
          </FormRow>
          <FormRow label="Cabin name">
            <Input type="text" id="name" />
          </FormRow>

          <FormRow label="Cabin name">
            <Input type="text" id="name" />
          </FormRow>

          <FormRow label="Cabin name">
            <Input type="text" id="name" />
          </FormRow>

          <FormRow label="Cabin name">
            <Input type="text" id="name" />
          </FormRow>

          <FormRow layout="flex">
            <CancelModelButton />

            <Button variation="primary" size="large" type="submit">
              Create New Booking
            </Button>
          </FormRow>
        </Form>
      </Model.Window>
    </>
  );
}
