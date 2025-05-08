import React, { useEffect, useState } from "react";
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
import { useAppContext } from "../context/AppContext";

const formSchema = z.object({
  note: z.string().min(2, {
    message: "Note must be at least 2 characters.",
  }),
});

const NoteDialogModal = ({ type = "", name, note = "", index = "" }) => {
  const { handleWeatherNote, editWeatherNote } = useAppContext();
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
    },
  });

  useEffect(() => {
    form.setValue("note", note);
  }, []);

  const onSubmit = (values) => {
    let note = values?.note;
    if (type === "add") {
      handleWeatherNote(name, note);
      setOpen(false);
    }
    if (type === "edit") {
      editWeatherNote(name, index, note);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {type === "add" ? (
          <Button className="hover:bg-blue-500 text-white bg-blue-600">
            <FaPlus /> Add note
          </Button>
        ) : (
          <Button className="hover:bg-blue-500 bg-blue-600 flex justify-center items-center">
            <FaRegEdit />{" "}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {type === "add" ? "Add your new note" : "Edit your note"}
          </DialogTitle>
          <DialogDescription>
            {type === "add"
              ? "Here you can add a new note to the current location weather"
              : "Here you can edit your note to your preference"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Note</FormLabel>
                    <FormControl>
                      <Input placeholder="your note here..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className=" w-full bg-blue-600 hover:bg-blue-500"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialogModal;
