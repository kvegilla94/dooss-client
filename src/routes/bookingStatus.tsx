import { cn } from "@/lib/utils";
import React from "react";

const bookingStatus = {
  BOOKED: "text-white bg-blue-700",
  COMPLETED: "text-white bg-green-700",
  CANCELLED: "text-white bg-red-700",
};

const BookingStatus = (props: { status: string }) => {
  return (
    <div className={cn("rounded-md py-1 px-2", bookingStatus[props.status])}>
      {props.status}
    </div>
  );
};

export default BookingStatus;
