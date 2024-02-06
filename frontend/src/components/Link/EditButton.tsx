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
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editLink } from "@/actions/Links";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export function EditButton({
  linkId,
  defaultLink,
  defaultDescription,
}: {
  linkId: number;
  defaultLink: string;
  defaultDescription: string;
}) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState(defaultLink);
  const [description, setDescription] = useState(defaultDescription);
  const queryClient = useQueryClient();
  const editLinkMutation = useMutation({
    mutationFn: editLink,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <MdEdit className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit a link</DialogTitle>
          <DialogDescription>
            Edit link details here. Click Save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={defaultLink}
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
              defaultValue={defaultDescription}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={link == "" || !link}
            onClick={() => editLinkMutation.mutate({ linkId, link, description })}
            type="submit"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
