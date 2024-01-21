import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getBookingDetails,
  updateBookingDetails,
} from "@/services/apis/dooss/requests/Booking";
import { format } from "date-fns";
import { useLoaderData, useNavigate } from "react-router-dom";
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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const loader = async ({ params }) => {
  const { data } = await getBookingDetails(params.id);
  return data;
};

const reschedSchema = z.object({
  date: z.date(),
  time: z.string(),
});

const BookingDetail = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { id, date, appointmentType, time, dentistId, status } =
    useLoaderData();

  const form = useForm<z.infer<typeof reschedSchema>>({
    resolver: zodResolver(reschedSchema),
    defaultValues: {
      date,
      time,
    },
  });

  const onSubmit = (values: z.infer<typeof reschedSchema>) => {
    updateBookingDetails(id, values);
    setOpen(!open);
    navigate(0);
  };

  const cancelBooking = () => {
    updateBookingDetails(id, { status: "CANCELLED" });
    navigate(0);
  };

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
        {status === "BOOKED" ? (
          <div className="flex flex-col space-y-1">
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <Button type="button" size={"sm"}>
                  Reschedule
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Form {...form}>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reschedule booking</AlertDialogTitle>
                  </AlertDialogHeader>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-end">
                          <FormLabel className="my-auto">Schedule</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant={"outline"}>
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a Date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Time slot" />
                              </SelectTrigger>
                              <SelectContent position="popper" sideOffset={5}>
                                <SelectItem value="8:00 AM">8:00 AM</SelectItem>
                                <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                <SelectItem value="10:00 AM">
                                  10:00 AM
                                </SelectItem>
                                <SelectItem value="11:00 AM">
                                  11:00 AM
                                </SelectItem>
                                <SelectItem value="12:00 PM">
                                  12:00 PM
                                </SelectItem>
                                <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                                <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                                <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                                <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                                <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <AlertDialogCancel
                      onClick={() => {
                        form.reset();
                        setOpen(!open);
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </AlertDialogContent>
            </AlertDialog>
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
                  <AlertDialogAction onClick={() => cancelBooking()}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default BookingDetail;
