import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import dynamic from "next/dynamic";
// import sendIcon from "@/components/icons/arrowRightCircle.json";

// const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validators/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const inter = Inter({ subsets: ["latin"] });
type Input = z.infer<typeof registerSchema>;

export default function Home() {
  const toast = useToast();
  const [formStep, setFormStep] = React.useState(0);
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: Input) {
    console.log(data);
  }
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
      <Card className="w-[450px] h-[450px] border border-transparent transform -translate-y-20">
        <img src="/mlsa.png" alt="Card image" className="mx-auto" />
        <CardHeader className="text-center">
          <CardTitle className="text-3xl CardTitle font-extrabold">
            MLSA KIIT Newsletter
          </CardTitle>

          <CardDescription>
            Join our monthly newsletter!
            <br />
            It's fun AND infrequent!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {formStep === 1 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center h-20"
              >
                Thank you for registering!
                <br />
                Every Monday, we send people an email that contains anything
                we've made that week — but more importantly: other good stuff we
                found on the internet...
              </motion.div>
            ) : (
              <Form {...form}>
                <div className="flex">
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="relative space-y-3 overflow-x-hidden flex-grow"
                  >
                    <motion.div
                      className={cn("space-y-3", {
                        // hidden: formStep == 1,
                      })}
                      // formStep == 0 -> translateX == 0
                      // formStep == 1 -> translateX == '-100%'
                      animate={{
                        translateX: `-${formStep * 100}%`,
                      }}
                      transition={{
                        ease: "easeInOut",
                      }}
                    >
                      {/* email */}
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email..."
                                {...field}
                                className="bg-white text-black"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>
                  </form>
                  <div
                    className="flex items-center gap-2 ml-1"
                    style={{ marginTop: "1.95rem" }}
                  >
                    <Button
                      type="button"
                      className={cn({
                        hidden: formStep == 1,
                      })}
                      onClick={() => {
                        form.trigger(["email"]);
                        const emailState = form.getFieldState("email");

                        if (!emailState.isDirty || emailState.invalid) return;

                        setFormStep(1);
                      }}
                    >
                      <span className="button-text font-medium">Subscribe</span>
                      {/* <Lottie
                        animationData={sendIcon}
                        style={{ width: 30, height: 30 }}
                      /> */}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </AnimatePresence>
        </CardContent>

        <CardHeader className="mt-5">
          <CardTitle>Latest Issue</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li>8th March 2024: We are ballin'</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
