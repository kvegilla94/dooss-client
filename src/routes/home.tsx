import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generateOtp, login } from "@/services/apis/dooss/requests/auth";
import useUser from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  otp: z.string().optional(),
});

const Home = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: undefined,
      otp: undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    form.clearErrors();

    if (values.otp) {
      const { success, data } = await login(values);
      if (success) {
        updateUser(data.user);
        return navigate("/user");
      }
      console.log(data);
      return form.setError("otp", { message: data.message });
    } else {
      await generateOtp({ email });
      setIsOtpSent(true);
    }
  };

  const resendOtp = async () => {
    await generateOtp({ email });
  };

  return (
    <div className="container flex flex-col min-h-screen justify-center items-center font-yeseva text-[#313131]">
      <p className="text-9xl text-center mb-16">
        We're making dental care even cooler
      </p>
      <span
        className="text-3xl rounded-md px-16 py-3 bg-slate-300 hover:bg-[#313131] hover:text-white cursor-pointer mb-4"
        onClick={() => navigate("/booking")}
      >
        Book Now
      </span>
      <Dialog>
        <DialogTrigger asChild>
          <span className=" hover:underline cursor-pointer">
            Login to manage your bookings
          </span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Log in</DialogTitle>
            <DialogDescription>Manage your appointments.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-2 gap-2"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className=" col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        {...field}
                        onChangeCapture={(e) => setEmail(e.currentTarget.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isOtpSent && (
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem className=" col-span-2">
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="One-Time Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {isOtpSent && (
                <Button
                  type="button"
                  variant={"secondary"}
                  onClick={() => resendOtp()}
                >
                  Resend
                </Button>
              )}
              {isOtpSent && (
                <Button type="submit" variant={"default"}>
                  Login
                </Button>
              )}
              {!isOtpSent && (
                <Button
                  type="submit"
                  variant={"default"}
                  // onClick={() => sendOtp()}
                >
                  Continue
                </Button>
              )}
            </form>
          </Form>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
