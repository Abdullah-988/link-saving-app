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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdAdd } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "@/actions/Links";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export function CreateButton({ categoryId }: { categoryId: number }) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const queryClient = useQueryClient();
  const createLinkMutation = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <MdAdd className="mr-2 h-4 w-4" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a link</DialogTitle>
          <DialogDescription>
            Add link details here. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              onChange={(e) => setLink(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={link == "" || !link}
            onClick={() => createLinkMutation.mutate({ categoryId, link, description })}
            type="submit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
