import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/validators/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { cn } from "@/lib/utils";
// import { ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from 'next/image'

const inter = Inter({ subsets: ["latin"] });
type Input = z.infer<typeof registerSchema>;

export default function Home() {
  const { toast } = useToast();
  const [formStep, setFormStep] = React.useState(0);
  const [showCard, setShowCard] = React.useState(false);
  const form = useForm<Input>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
    },
  });

  async function addToList(data: Input) {
    const response = await fetch("/api/mailing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        list: "mlsa.newsletter@newsletter.rycerzes.co",
      }),
    });

    if (response.ok) {
      console.log("Email added to list successfully");
    } else {
      console.error("An error occurred");
    }
  }

  function onSubmit(data: Input) {
    // toast({
    //   title: "",
    //   variant: "default",
    // });
    addToList(data);
    alert(JSON.stringify(data, null, 4));
    console.log(data);
  }

  return (
    <main>
      <BackgroundBeams />
      <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Image
          src="/mlsa.png"
          alt="Card image"
          className="mx-auto"
          width={150}
          height={150}
        />
        <Card className="w-[400px] h-[325px] bg-transparent border-transparent">
          <CardHeader>
            <CardTitle className="text-3xl CardTitle font-extrabold text-center">
              MLSA KIIT Newsletter
            </CardTitle>
            <CardDescription className="text-center">
              Join our monthly newsletter!
              <br />
              It&apos;s fun AND infrequent!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative space-y-3 overflow-x-hidden"
              >
                <AnimatePresence>
                  <div className="relative">
                    {!showCard ? (
                      <motion.div
                        key="emailForm"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
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
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex gap-2 mt-3">
                          <Button
                            type="submit"
                            className={cn(
                              "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
                              {
                                hidden: formStep == 1,
                              }
                            )}
                            onClick={async () => {
                              // validation
                              form.trigger(["email"]);
                              const isValid = await form.trigger(["email"]);

                              if (!isValid) return;

                              form.handleSubmit(onSubmit)();
                              setFormStep(1);
                              setShowCard(true);
                            }}
                          >
                            <span className="button-text font-medium">
                              Subscribe
                            </span>
                            <BottomGradient />
                          </Button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.5 } }}
                        exit={{ opacity: 0 }}
                      >
                        <Card className="w-[350px] h-[175px] text-center border-transparent bg-transparent">
                          {/* maintain a gap of 150 */}
                          <CardContent className="mt-5">
                            Thank you for registering!
                            <br />
                            Every Monday, we send people an email that contains
                            anything we&apos;ve made that week — but more
                            importantly: other good stuff we found on the
                            internet...
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </div>
                </AnimatePresence>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card className="border-transparent bg-transparent">
          <CardHeader className="">
            <CardTitle>Latest Issue</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              <li>8th March 2024: We are ballin&apos;</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
