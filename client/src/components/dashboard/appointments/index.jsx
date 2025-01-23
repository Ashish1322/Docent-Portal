import React, { useRef, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import SlotPopup from "./book-slot-popup";

export default function Appointment() {
  const [currentSelectedSlot, setCurrentSelectedSlot] = useState(null);
  const role = "doctor";
  function openModal() {
    buttonRef.current.click();
  }
  function seletctSlot(e) {
    // role : from store
    if (role != "doctor") return;
    // 1. open popup and fill these event details on popup and show button to open slot
    setCurrentSelectedSlot(e);
    openModal();
  }

  // Todo : Take this from an api
  let doctorSlots = [
    {
      start: new Date(),
      end: new Date(),
      title: "Available",
      eventId: "sdfd",
    },
  ];

  const buttonRef = useRef();
  return (
    <div>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        onSelectSlot={seletctSlot}
        onSelectEvent={(e) => {
          console.log(e);
        }}
        selectable={true}
        events={doctorSlots}
      />
      <SlotPopup currentSelectedSlot={currentSelectedSlot} />
      <button
        ref={buttonRef}
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>
    </div>
  );
}
