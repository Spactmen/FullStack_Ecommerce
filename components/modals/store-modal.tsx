"use client";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";
// import prismadb from "@/lib/prismadb";

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters"),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading,setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try{
      setLoading(true);
      const response = await axios.post('/api/stores', values)
      console.log(response.data);
      window.location.assign(`/${response.data.id}`);
      toast.success("Store Created");
    }catch (error){
      console.log(error)
      toast.error("Something went wrong")
    }finally{
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to create and manage products"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="E-commerce" {...field} />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
                <div className="pt-6 space-x-2 flex items-center justify-end">
                    <Button disabled={loading} variant="outline" onClick={storeModal.onClose}>Cancel</Button>
                    <Button disabled={loading} type="submit">Continue</Button>
                </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
