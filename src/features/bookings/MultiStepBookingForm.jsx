import Model from "../../ui/Model";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Select from "../../ui/Select";
import BoxRadio from "../../ui/BoxRadio";
import Textarea from "../../ui/Textarea";

import CloseButton from "../../ui/CloseButton";
import { useEffect, useState } from "react";
import { MAXSTEPSBOOKING } from "../../utils/constants";
import CabinIDTable from "./CabinIDTable";
import GuestIDTable from "./GuestIDTable";
import styled from "styled-components";
import { Controller, useForm } from "react-hook-form";
import Input from "../../ui/Input";
import { useContextAddBookings } from "../../context/useContextAddBookings";
import { useCreateBookings } from "./useCreateBookings";
import { useBookings } from "./useBookings";
import { useLastIDBooking } from "./useLastIDBooking";
import { useSearchParams } from "react-router-dom";
import { set } from "date-fns";

const MultiStepForm = styled(Form)`
  overflow: auto;
  width: 80vw;
  table {
    th  {
      font-size: 1rem;
    }
    td {
      font-size: 1.1rem;
    }
    th:last-child,
    td:last-child {
      width: 5rem;
    }
    th:first-child,
    td:first-child {
      width: 4rem;
    }
  }
`;
let statusOptions = [
  { label: "Check In", value: "checked-in" },
  { label: "Check Out", value: "checked-out" },
  { label: "Unconfirmed", value: "unconfirmed" },
];
const StyledRadioBox = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1fr 1fr;
  gap: 1.4rem;
`;
const requiredField = { required: "This field is required" };
export default function MultiStepBookingForm({ closeModel }) {
  const [step, setStep] = useState(0);
  const {cabinID, guestID} = useContextAddBookings();
  const nextStep = (e) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const prevStep = (e) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

  const { register, handleSubmit, formState : {errors}, reset, control } = useForm();
  const {isCreating, createBooking} = useCreateBookings();
  const {isLoading, lastID } = useLastIDBooking();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({});
  }, [searchParams]);

  if(isLoading) return <h3>Loading...</h3>;
  const submitForm = (data) => {
const allData = {
  id: lastID + 1,
  startDate: new Date(data.startDate).toISOString(),
  endDate: new Date(data.endDate).toISOString(),
  totalPrice: Number(data.totalPrice),
  numberOfNight: Number(data.numberOfNight),
  numberOfGuest: Number(data.numberOfGuest),
  cabinPrice: Number(data.cabinPrice),
  fees: Number(data.fees),
  status: data.status,
  hasBreakfast: data.hasBreakfast ,
  isPaid: data.isPaid ,
  observation: data.observation,
  cabinId : cabinID,
  guestId : guestID,

}  
createBooking(allData);
};

  const errorForm = (error) => {
    console.log(error );
  };




  return (
    <>
      <CloseButton />
      <Model.Window>
      <MultiStepForm model="true" onSubmit={handleSubmit(submitForm, errorForm)}>
          <h4>All Field are required</h4>
         {
          step === 0 && (
            <>
      <FormRow label="Start Date">
        <Input
          type="datetime-local"
          id="startDate"
         {
            ...register("startDate", {
              ...requiredField ,
              validate: (value) => {
                const endDate = getValues("endDate");
                if (endDate && value > endDate) {
                  return "Start Date must be less than End Date";
                }
                return true;
              } 
            })

         }
        />
      </FormRow>
      <FormRow label="End Date">
        <Input
          type="datetime-local"
          id="endDate"
          {
            ...register("endDate", {
...requiredField ,
              validate: (value) => {
                const startDate = getValues("startDate");
                if (startDate && value < startDate) {
                  return "End Date must be greater than Start Date";
                }
                return true;
              }
            })
          
          }
        />
      </FormRow>
      <FormRow label="Number Of Night">
        <Input
          type="number"
          id="numberOfNight"
          {
            ...register("numberOfNight", {
...requiredField ,
              validate: (value) => {
                if (value < 1) {
                  return "Number of Night must be greater than 0";
                }
                return true;
              }
            })

          }
        />
      </FormRow>
      <FormRow label="Number of Guest">
        <Input
          type="number"
          id="numberOfGuest"
          {
            ...register("numberOfGuest", {
...requiredField ,
              validate: (value) => {
                if (value < 1) {
                  return "Number of Guest must be greater than 0";
                }
                return true;
              }
            })
          }
        />
      </FormRow>
      <FormRow label="Cabin Price">
        <Input
          type="number"
          id="cabinPrice"
          {
            ...register("cabinPrice", {
...requiredField ,
              validate: (value) => {
                if (value < 1) {
                  return "Cabin Price must be greater than 0";
                }
                return true;
              }
            })
          }
        />
      </FormRow>
      <FormRow label="Fees">
        <Input
          type="number"
          id="fees"
          {
            ...register("fees", {
...requiredField ,
              validate: (value) => {
                if (value < 1) {
                  return "Fees must be greater than 0";
                }
                return true;
              }
            })
          }
        />
      </FormRow>
    </>
          )
         }
         {
          step === 1 && (
            <>
              <FormRow label="Total Price">
                <Input
                  type="number"
                  id="totalPrice"
                  {
                    ...register("totalPrice", {
                      ...requiredField,
                    })
        
                  }
        
                />
              </FormRow>
              <FormRow label="Status">
                <Controller
                  name="status"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select
                      id="status"
                      {...field}
         {
                    ...register("status", {
...requiredField ,
                    })
                    
                  }
                    >
                      <option value="">Select Status</option>
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </FormRow>
              <StyledRadioBox>
                <p>Has Breakfast</p>
                <BoxRadio label="Yes">
                  <Input
                    type="radio"
                    id="true"
                    value="true"
                    {
                      ...register("hasBreakfast", {
                        required: true,
                        message: "This field is required",
                      })
                      
                    }
                  />
                </BoxRadio>
                <BoxRadio label="No">
                  <Input
                    type="radio"  
                    id="false"
                    value="false"

                     {
                    ...register("hasBreakfast", {
...requiredField ,
                    })
                    
                  }
                  />
                </BoxRadio>
              </StyledRadioBox>
        
              <StyledRadioBox>
                <p>Is Paid</p>
        
                <BoxRadio label="Yes">
                  <Input
                    type="radio"
                    id="true"
                    value="true"

                    {
                    ...register("isPaid", {
                      ...requiredField ,                    })
                    
                  }
                  />
                </BoxRadio>
        
                <BoxRadio label="No">
                  <Input
                    type="radio"
                    id="false"
                    value="false"

                     {
                    ...register("isPaid", {
                      ...requiredField ,                    })
                    
                  }
                  />
                </BoxRadio>
              </StyledRadioBox>
              <FormRow label="Observation">
                <Textarea
                  id="observation"
                  {
                    ...register("observation", {
                      ...requiredField ,                    })
                    
                  }
              />
              </FormRow>
            </>
          )
         }
         {
          step === 2 && <CabinIDTable />
         }
          {
          step === 3 && <GuestIDTable />
          }
          <FormRow layout="flex">
            {step > 0 && (
              <Button variation="secondary" onClick={prevStep}>
                Prev
              </Button>
            )}
            {step < MAXSTEPSBOOKING ? (
              <Button variation="primary" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button variation="primary" type="submit" 
              
              disabled={isCreating}

              >
                Finish
              </Button>
            )}
          </FormRow>
        </MultiStepForm>
      </Model.Window>
    </>
  );
}
