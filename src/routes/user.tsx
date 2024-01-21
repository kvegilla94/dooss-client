import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBookingsByUser } from "@/services/apis/dooss/requests/Booking";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState<string | undefined>("");

  const [bookings, setBookings] = useState<
    { id: number; appointmentType: string; date: Date }[]
  >([]);

  useEffect(() => {
    getBookingsByUser(1).then((response) => {
      setBookings(response.data.bookings);
    });

    setCurrentPath(location.pathname.split("/").pop());
  }, [location]);

  return (
    <div className="flex">
      <div className="flex flex-col bg-slate-400 p-2 min-h-screen space-y-1 min-w-[250px]">
        <div className="flex justify-between items-center pl-4 py-2">
          <p className="text-xl">Kelvin</p>
          <Button type="button" variant={"ghost"}>
            <FaArrowRightFromBracket />
          </Button>
        </div>
        {bookings.map((booking) => {
          return (
            <div
              key={booking.id}
              onClick={() => navigate(`${booking.id}`)}
              className={cn(
                currentPath === booking.id.toString() ? "bg-slate-600" : "",
                "py-2 px-4 rounded-md"
              )}
            >
              {booking.appointmentType}{" "}
              {booking.date ? format(booking.date, "MM-dd-yyyy") : "Undefined"}
            </div>
          );
        })}
      </div>
      <div className="p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
