import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getBookingsByUser } from "@/services/apis/dooss/requests/Booking";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import useUser from "@/store/user";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useUser();
  const [currentPath, setCurrentPath] = useState<string | undefined>("");

  if (user.id === 0) {
    navigate("/");
  }

  const [bookings, setBookings] = useState<
    { id: number; appointmentType: string; date: Date }[]
  >([]);

  useEffect(() => {
    getBookingsByUser(user.id).then((response) => {
      setBookings(response.data.bookings);
    });

    setCurrentPath(location.pathname.split("/").pop());
  }, [location, user]);

  function logout(): void {
    updateUser({ id: 0, firstName: "", lastName: "", email: "" });
    navigate("/");
  }

  return (
    <div className="flex">
      <div className="flex flex-col bg-slate-400 p-2 min-h-screen space-y-1 min-w-[250px]">
        <div className="flex justify-between items-center pl-4 py-2">
          <p className="text-xl">{user.firstName}</p>
          <Button type="button" variant={"ghost"} onClick={() => logout()}>
            <FaArrowRightFromBracket />
          </Button>
        </div>
        <Separator />
        <div>
          <Button
            variant={"secondary"}
            className="w-full"
            onClick={() => navigate("book")}
          >
            Create new booking
          </Button>
        </div>
        {bookings.map((booking) => {
          return (
            <div
              key={booking.id}
              onClick={() => navigate(`${booking.id}`)}
              className={cn(
                currentPath === booking.id.toString()
                  ? "bg-slate-600 text-white"
                  : "",
                "py-2 px-4 rounded-md"
              )}
            >
              {booking.appointmentType}{" "}
              {booking.date ? format(booking.date, "MM-dd-yyyy") : "Undefined"}
            </div>
          );
        })}
      </div>
      <div className="p-8 min-w-[425px]">
        <Outlet />
      </div>
    </div>
  );
};

export default User;
