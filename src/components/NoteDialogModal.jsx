import React from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  note: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const NoteDialogModal = ({ type = "", note = "" }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === "add" ? (
          <Button className="hover:bg-blue-500 text-white bg-blue-600">
            <FaPlus /> Add note
          </Button>
        ) : (
          <Button className="hover:bg-blue-500">
            <FaRegEdit />{" "}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? (
              <h2 className="text">Add your new note</h2>
            ) : (
              <h2 className="text">Edit your note</h2>
            )}
          </DialogTitle>
          <DialogDescription>
            {type === "add" ? (
              <h2 className="text">
                Here you can add a new note to the current location weather
              </h2>
            ) : (
              <h2 className="text">
                Here you can edit your note to your preference
              </h2>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className=" w-full bg-blue-600 hover:bg-blue-500" type="submit">Submit</Button>
              </form>
            </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialogModal;
