"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  "phone-number": z.string().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
});

export default function Enter() {
  return (
    <div></div>
  );
  // // 1. Define your form.
  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     name: "",
  //     "phone-number": "",
  //   },
  // });

  // // 2. Define a submit handler.
  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   // Do something with the form values.
  //   // ✅ This will be type-safe and validated.
  //   console.log(values);
  // }

  // return (
  //   <main className="flex min-h-screen flex-col items-center p-24">
  //     <h1 className="text-center">
  //       Hi! Let&apos;s see how we can make your day a bit easier 💛 🥰
  //     </h1>

  //     <br />
  //     <Form {...form}>
  //       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
  //         <FormField
  //           control={form.control}
  //           name="name"
  //           render={({ field }) => (
  //             <FormItem>
  //               {/* <FormLabel>Name</FormLabel> */}
  //               <FormControl>
  //                 <Input placeholder="Name" {...field} />
  //               </FormControl>
  //               {/* <FormDescription>
  //                 This is your public display name.
  //               </FormDescription> */}
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <FormField
  //           control={form.control}
  //           name="phone-number"
  //           render={({ field }) => (
  //             <FormItem>
  //               {/* <FormLabel>Name</FormLabel> */}
  //               <FormControl>
  //                 <Input placeholder="Phone Number" {...field} />
  //               </FormControl>
  //               {/* <FormDescription>
  //                 This is your public display name.
  //               </FormDescription> */}
  //               <FormMessage />
  //             </FormItem>
  //           )}
  //         />
  //         <Button type="submit" style={{ float: "right" }}>
  //           ➡
  //         </Button>
  //       </form>
  //     </Form>
  //   </main>
  // );
}

// "use client"

// import { Input } from "@/components/ui/input"

// import { z } from "zod"

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })

// export default function Enter() {
//   return (
//     <main className="flex min-h-screen flex-col items-center p-24">
//       <h1>Hi! Let's see how we can make your day a bit easier 💛 🥰</h1>
//       <br />
//       <Input type="name" placeholder="Name" />
//       <br />
//       <Input type="phone" placeholder="Phone Number" />
//     </main>
//   );
// }
