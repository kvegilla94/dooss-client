import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBookingDetails } from "@/services/apis/dooss/requests/Booking";
import { format } from "date-fns";
import { useLoaderData } from "react-router-dom";
import BookingStatus from "./bookingStatus";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const loader = async ({ params }) => {
  const { data } = await getBookingDetails(params.id);
  return data;
};

const BookingDetail = () => {
  const { id, date, appointmentType, time, dentistId, status } =
    useLoaderData();

  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>{appointmentType} </CardTitle>
        <CardDescription className="flex justify-between">
          <div>Booking Reference: {id} </div>
          <BookingStatus status={status} />
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        <div>
          <p>{dentistId}</p>
          <p>{format(date, "MMMM dd, yyyy")}</p>
          <p>{time}</p>
        </div>
        <div className="flex flex-col space-y-1">
          <Button type="button" size={"sm"}>
            Reschedule
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" variant={"destructive"} size={"sm"}>
                Cancel
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => console.log("HEHE")}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingDetail;
