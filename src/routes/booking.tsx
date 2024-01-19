"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { getBookings } from "@/services/apis/dooss/requests/Booking";

const bookingSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  dentist: z.string(),
  appointmentType: z.string(),
  date: z.date(),
  time: z.string(),
});
const Booking = () => {
  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dentist: "",
      appointmentType: "",
      date: undefined,
      time: "",
    },
  });

  const fetchBookings = async () => {
    const { data } = await getBookings();
    console.log(data);
  };

  const onSubmit = (values: z.infer<typeof bookingSchema>) => {
    fetchBookings();
    console.log(values);
  };
  return (
    <div className="container flex flex-col min-h-screen justify-center items-center text-[#313131]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-2"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className=" col-span-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dentist"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dentist</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Dentist" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Dentist 1</SelectItem>
                      <SelectItem value="2">Dentist 2</SelectItem>
                      <SelectItem value="3">Dentist 3</SelectItem>
                      <SelectItem value="4">Dentist 4</SelectItem>
                      <SelectItem value="5">Dentist 5</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Services" />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={5}>
                      <SelectItem value="1">Cleaning</SelectItem>
                      <SelectItem value="2">Whitening</SelectItem>
                      <SelectItem value="3">Extractions</SelectItem>
                      <SelectItem value="4">Veneers</SelectItem>
                      <SelectItem value="5">Fillings</SelectItem>
                      <SelectItem value="6">Crowns</SelectItem>
                      <SelectItem value="7">Root Canal</SelectItem>
                      <SelectItem value="8">Braces/Invisalign</SelectItem>
                      <SelectItem value="9">Bonding</SelectItem>
                      <SelectItem value="10">Dentures</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
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
                      <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                      <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                      <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                      <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                      <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                      <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                      <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                      <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="col-span-2">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Booking;
